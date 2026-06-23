create table weather_stations (
  id uuid primary key default gen_random_uuid(),
  name_en text not null,
  name_ka text,
  url text not null,
  altitude integer not null,
  sort_order integer default null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table weather_stations enable row level security;

create policy "public read" on weather_stations for select using (true);
create policy "authenticated write" on weather_stations for all using (auth.role() = 'authenticated');

create function auto_sort_weather_station()
returns trigger language plpgsql as $$
begin
  if new.sort_order is null then
    new.sort_order := coalesce((select max(sort_order) + 1 from weather_stations), 0);
  end if;
  return new;
end;
$$;

create trigger weather_stations_auto_sort
  before insert on weather_stations
  for each row execute function auto_sort_weather_station();

create trigger update_weather_stations_updated_at
  before update on weather_stations
  for each row execute function update_updated_at_column();

create function reorder_weather_stations(updates jsonb)
returns void language plpgsql security definer
set search_path = ''
as $$
begin
  update public.weather_stations
  set sort_order = (elem->>'sort_order')::int
  from jsonb_array_elements(updates) as elem
  where id = (elem->>'id')::uuid;
end;
$$;

revoke execute on function reorder_weather_stations(jsonb) from public;
grant execute on function reorder_weather_stations(jsonb) to authenticated;

insert into weather_stations (name_en, name_ka, url, altitude, sort_order) values
  ('Altihut Kazbegi', 'ალტიჰუტი, ყაზბეგი', 'https://www.wunderground.com/dashboard/pws/IMTSKH8', 3014, 0),
  ('Top of Kudebi Lift, Gudauri', 'კუდების საბაგიროს წვერი, გუდაური', 'https://www.wunderground.com/dashboard/pws/IMTSKH9', 3000, 1),
  ('Vitamin Cafe, Gudauri', 'ვიტამინის კაფე, გუდაური', 'https://www.ecowitt.net/home/share?authorize=BYREP7', 2688, 2),
  ('Bedoni Village', 'ბედონი სოფელი', 'https://www.wunderground.com/dashboard/pws/I90583634', 1340, 3);
