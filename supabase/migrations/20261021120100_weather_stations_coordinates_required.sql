-- Every station has a location now: coordinates are required, so the
-- "set together or not at all" pair check is no longer needed.
ALTER TABLE public.weather_stations
  ALTER COLUMN latitude SET NOT NULL,
  ALTER COLUMN longitude SET NOT NULL,
  DROP CONSTRAINT weather_stations_coordinates_pair;
