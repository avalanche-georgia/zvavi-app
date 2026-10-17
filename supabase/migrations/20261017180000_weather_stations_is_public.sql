-- Staff can hide a station from the public page and map without deleting it.
-- Visitors read only public stations; staff still see every station through
-- "Staff can manage weather stations" (FOR ALL).
ALTER TABLE public.weather_stations
  ADD COLUMN is_public boolean NOT NULL DEFAULT true;

DROP POLICY IF EXISTS "public read" ON public.weather_stations;
CREATE POLICY "public read" ON public.weather_stations
  FOR SELECT TO anon, authenticated
  USING (is_public);
