create extension if not exists pg_cron;

do $$ begin
  if exists (select 1 from cron.job where jobname = 'expire-members') then
    perform cron.unschedule('expire-members');
  end if;
end $$;

select cron.schedule(
  'expire-members',
  '0 0 * * *',
  $$
    update members
    set status = 'expired'
    where status = 'active'
      and expires_at is not null
      and expires_at < current_date
  $$
);
