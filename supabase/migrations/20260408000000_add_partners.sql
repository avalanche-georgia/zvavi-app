create table partners (
  id          uuid primary key default gen_random_uuid(),
  name_en     text not null,
  name_ka     text,
  benefit_en  text,
  benefit_ka  text,
  logo_url    text not null,
  website_url text,
  tier        integer not null default 1 check (tier in (1, 2, 3)),
  is_active   boolean not null default true,
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);

alter table partners enable row level security;

create policy "Public can read active partners" on partners
  for select using (is_active = true);

create policy "Admins can manage partners" on partners
  for all using (auth.role() = 'authenticated');

create trigger partners_updated_at before update on partners
  for each row execute procedure update_updated_at_column();
