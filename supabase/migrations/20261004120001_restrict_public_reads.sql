-- Anonymous visitors must never read personal data. Public pages that need
-- avalanche records read them through service-role routes with explicit
-- safe-column lists (fetchPublicForecastAvalanches, publicObservationsQuery),
-- so anon needs no direct access to those tables.

-- 1. user_profiles: staff emails, names and roles were readable by anyone.
--    Each user keeps reading their own profile ("user can read own profile").
DROP POLICY IF EXISTS "public read profiles" ON public.user_profiles;
REVOKE ALL ON public.user_profiles FROM anon;

-- 2. recent_avalanches: anon could read every column of team-logged records
--    (drafts included) — involvement notes, created_by_user_id, submitter_*.
DROP POLICY IF EXISTS "Allow anon to read team-authored avalanches" ON public.recent_avalanches;
REVOKE ALL ON public.recent_avalanches FROM anon;

-- Translated avalanche descriptions follow their records (unused by the app)
DROP POLICY IF EXISTS "Public can read avalanche translations" ON public.avalanche_translations;
REVOKE ALL ON public.avalanche_translations FROM anon;

-- 3. forecasts: anon reads published forecasts only (drafts carry unreviewed
--    text and forecaster names); signed-in users keep reading everything.
DROP POLICY IF EXISTS "Allow read access for all users" ON public.forecasts;
CREATE POLICY "Anyone can read published forecasts" ON public.forecasts
  FOR SELECT TO anon USING (status = 'published');
CREATE POLICY "Signed-in users can read forecasts" ON public.forecasts
  FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Allow read access for all users" ON public.avalanche_problems;
CREATE POLICY "Anyone can read problems of published forecasts" ON public.avalanche_problems
  FOR SELECT TO anon USING (
    EXISTS (SELECT 1 FROM public.forecasts f WHERE f.id = forecast_id AND f.status = 'published')
  );
CREATE POLICY "Signed-in users can read problems" ON public.avalanche_problems
  FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Public can read forecast_avalanche" ON public.forecast_avalanche;
CREATE POLICY "Anyone can read links of published forecasts" ON public.forecast_avalanche
  FOR SELECT TO anon USING (
    EXISTS (SELECT 1 FROM public.forecasts f WHERE f.id = forecast_id AND f.status = 'published')
  );
CREATE POLICY "Signed-in users can read links" ON public.forecast_avalanche
  FOR SELECT TO authenticated USING (true);

-- 4. Legacy RPCs: unused by the app, broken (they join on the removed
--    recent_avalanches.forecast_id) and would return every avalanche column
--    to anon if that column ever came back.
DROP FUNCTION IF EXISTS public.fetch_combined_forecast_data();
DROP FUNCTION IF EXISTS public.get_latest_published_forecast_with_related();

-- 5. reorder_weather_stations is SECURITY DEFINER with no auth check: anon
--    could reorder the station list. Staff only.
REVOKE ALL ON FUNCTION public.reorder_weather_stations(jsonb) FROM public, anon;
GRANT EXECUTE ON FUNCTION public.reorder_weather_stations(jsonb) TO authenticated;

-- 6. Advisor hardening: handle_new_auth_user is a trigger function (fires on
--    auth.users insert) and needn't be callable over the API; verify_member is
--    SECURITY DEFINER and public by design, so pin its search_path.
REVOKE ALL ON FUNCTION public.handle_new_auth_user() FROM public, anon, authenticated;
ALTER FUNCTION public.verify_member(text, inet, text) SET search_path = public;
