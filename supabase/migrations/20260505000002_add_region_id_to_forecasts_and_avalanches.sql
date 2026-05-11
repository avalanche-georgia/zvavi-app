alter table public.forecasts
  add column region_id public.region_id references public.regions(id);

alter table public.recent_avalanches
  add column region_id public.region_id references public.regions(id);

create index forecasts_region_id_idx on public.forecasts (region_id);
create index recent_avalanches_region_id_idx on public.recent_avalanches (region_id);

update public.forecasts set region_id = 'gudauri' where region_id is null;
update public.recent_avalanches set region_id = 'gudauri' where region_id is null;
