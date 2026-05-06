create type public.region_id as enum ('gudauri');

alter type public.region_id owner to postgres;

create table if not exists public.regions (
  id public.region_id primary key,
  is_active boolean not null default true,
  display_order smallint not null default 0,
  map_center jsonb,
  default_zoom smallint,
  forecast_zone jsonb,
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null
);

alter table public.regions owner to postgres;

create index regions_active_idx on public.regions (id) where is_active;

create or replace trigger update_regions_updated_at
  before update on public.regions
  for each row execute function public.update_updated_at_column();

alter table public.regions enable row level security;

create policy "Public can read regions" on public.regions
  for select using (true);

create policy "Authenticated users can manage regions" on public.regions
  for all to authenticated using (true) with check (true);

grant all on table public.regions to anon;
grant all on table public.regions to authenticated;
grant all on table public.regions to service_role;

insert into public.regions (id) values ('gudauri');
