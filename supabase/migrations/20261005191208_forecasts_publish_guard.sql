-- Strict published_at / valid_until lifecycle (public API spec §5.4).
--
-- published_at is owned by this trigger; clients can no longer set it:
-- - publish (insert or status change to 'published'): published_at := now(),
--   only if valid_until is set and in the future — otherwise rejected.
--   Every re-publish resets it.
-- - unpublish: published_at := null.
-- - any other edit: published_at stays as it was. A published forecast's
--   valid_until must stay after published_at.
--
-- Rejections use errcode check_violation (23514) with stable messages; the
-- admin UI maps the code to a readable error.
--
-- The table constraint is NOT VALID: existing rows aren't scanned (staging
-- had 4 published rows republished after they expired), but every new or
-- updated row is checked. Do not VALIDATE it until those rows are fixed.

create or replace function public.handle_published_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  if tg_op = 'INSERT' or new.status is distinct from old.status then
    if new.status = 'published' then
      if new.valid_until is null or new.valid_until <= now() then
        raise exception 'cannot publish: valid_until must be set and in the future'
          using errcode = 'check_violation';
      end if;

      new.published_at := now();
    else
      new.published_at := null;
    end if;

    return new;
  end if;

  new.published_at := old.published_at;

  if new.status = 'published'
     and (new.valid_until is null or new.valid_until <= new.published_at) then
    raise exception 'cannot save: valid_until must stay after the publication time'
      using errcode = 'check_violation';
  end if;

  return new;
end;
$$;

drop trigger if exists update_published_at on public.forecasts;

create trigger update_published_at
  before insert or update on public.forecasts
  for each row execute function public.handle_published_at();

alter table public.forecasts
  drop constraint if exists forecasts_published_window_valid;

alter table public.forecasts
  add constraint forecasts_published_window_valid check (
    status <> 'published'
    or (published_at is not null and valid_until is not null and valid_until > published_at)
  ) not valid;
