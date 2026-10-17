-- Station location for the maps. Nullable for now: existing stations have no
-- coordinates yet (the admin form requires them on every save). Make NOT NULL
-- once they're backfilled — see local/tech-debt.md. Same ranges as the forms;
-- latitude and longitude are set together or not at all.
ALTER TABLE public.weather_stations
  ADD COLUMN latitude double precision,
  ADD COLUMN longitude double precision,
  ADD CONSTRAINT weather_stations_latitude_range
    CHECK (latitude BETWEEN -90 AND 90),
  ADD CONSTRAINT weather_stations_longitude_range
    CHECK (longitude BETWEEN -180 AND 180),
  ADD CONSTRAINT weather_stations_coordinates_pair
    CHECK ((latitude IS NULL) = (longitude IS NULL));
