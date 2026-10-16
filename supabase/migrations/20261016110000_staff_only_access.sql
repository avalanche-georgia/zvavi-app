-- Access review, phase 1: "signed in" no longer means "team".
--
-- Until now every policy below trusted any `authenticated` account, so a stray
-- account (public sign-up, trainee, leftover test user) could read and rewrite
-- members, applications, avalanche records (including submitters' contact
-- details), regions, partners and weather stations. Public sign-up is now off;
-- this makes the database enforce the same boundary.
--
-- Staff = user_profiles.role in ('admin', 'forecaster') — the same set as
-- can_edit_forecasts(). Trainees and role-less accounts are not staff.

-- 1. Role check, usable from policies. SECURITY DEFINER so it can read the
--    caller's role whatever the user_profiles policies say.
CREATE OR REPLACE FUNCTION public.is_staff()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_profiles
    WHERE id = auth.uid() AND role IN ('admin', 'forecaster')
  );
$$;

REVOKE ALL ON FUNCTION public.is_staff() FROM public, anon;
GRANT EXECUTE ON FUNCTION public.is_staff() TO authenticated;

-- 2. Policies: staff-only (the (SELECT ...) wrapper evaluates is_staff() once per query)

-- members
DROP POLICY IF EXISTS "Authenticated users can read members" ON public.members;
DROP POLICY IF EXISTS "Authenticated users can insert members" ON public.members;
DROP POLICY IF EXISTS "Authenticated users can update members" ON public.members;
DROP POLICY IF EXISTS "Authenticated users can delete members" ON public.members;
DROP POLICY IF EXISTS "Staff can manage members" ON public.members;
CREATE POLICY "Staff can manage members" ON public.members
  FOR ALL TO authenticated
  USING ((SELECT public.is_staff())) WITH CHECK ((SELECT public.is_staff()));

-- member_applications (rows are created by the service-role route, never by a user session)
DROP POLICY IF EXISTS "Authenticated users can read applications" ON public.member_applications;
DROP POLICY IF EXISTS "Authenticated users can update applications" ON public.member_applications;
DROP POLICY IF EXISTS "Authenticated users can delete applications" ON public.member_applications;
DROP POLICY IF EXISTS "Staff can manage applications" ON public.member_applications;
CREATE POLICY "Staff can manage applications" ON public.member_applications
  FOR ALL TO authenticated
  USING ((SELECT public.is_staff())) WITH CHECK ((SELECT public.is_staff()));

-- member_verifications (written by verify_member, read by staff)
DROP POLICY IF EXISTS "Authenticated users can read verifications" ON public.member_verifications;
DROP POLICY IF EXISTS "Staff can read verifications" ON public.member_verifications;
CREATE POLICY "Staff can read verifications" ON public.member_verifications
  FOR SELECT TO authenticated USING ((SELECT public.is_staff()));

-- recent_avalanches (public reports go through submit_observation / service-role routes)
DROP POLICY IF EXISTS "Allow authenticated to read all avalanches" ON public.recent_avalanches;
DROP POLICY IF EXISTS "Allow insert for authenticated users" ON public.recent_avalanches;
DROP POLICY IF EXISTS "Allow update for authenticated users" ON public.recent_avalanches;
DROP POLICY IF EXISTS "Enable delete for users" ON public.recent_avalanches;
DROP POLICY IF EXISTS "Staff can manage avalanches" ON public.recent_avalanches;
CREATE POLICY "Staff can manage avalanches" ON public.recent_avalanches
  FOR ALL TO authenticated
  USING ((SELECT public.is_staff())) WITH CHECK ((SELECT public.is_staff()));

-- regions (public read policy stays)
DROP POLICY IF EXISTS "Authenticated users can manage regions" ON public.regions;
DROP POLICY IF EXISTS "Staff can manage regions" ON public.regions;
CREATE POLICY "Staff can manage regions" ON public.regions
  FOR ALL TO authenticated
  USING ((SELECT public.is_staff())) WITH CHECK ((SELECT public.is_staff()));

-- partners (public read of active partners stays)
DROP POLICY IF EXISTS "Admins can manage partners" ON public.partners;
DROP POLICY IF EXISTS "Staff can manage partners" ON public.partners;
CREATE POLICY "Staff can manage partners" ON public.partners
  FOR ALL TO authenticated
  USING ((SELECT public.is_staff())) WITH CHECK ((SELECT public.is_staff()));

-- weather_stations (public read stays)
DROP POLICY IF EXISTS "authenticated write" ON public.weather_stations;
DROP POLICY IF EXISTS "Staff can manage weather stations" ON public.weather_stations;
CREATE POLICY "Staff can manage weather stations" ON public.weather_stations
  FOR ALL TO authenticated
  USING ((SELECT public.is_staff())) WITH CHECK ((SELECT public.is_staff()));

-- forecasts, problems, links: drafts are no longer readable by every account
DROP POLICY IF EXISTS "Signed-in users can read forecasts" ON public.forecasts;
DROP POLICY IF EXISTS "Staff can read forecasts" ON public.forecasts;
CREATE POLICY "Staff can read forecasts" ON public.forecasts
  FOR SELECT TO authenticated USING ((SELECT public.is_staff()));

DROP POLICY IF EXISTS "Signed-in users can read problems" ON public.avalanche_problems;
DROP POLICY IF EXISTS "Staff can read problems" ON public.avalanche_problems;
CREATE POLICY "Staff can read problems" ON public.avalanche_problems
  FOR SELECT TO authenticated USING ((SELECT public.is_staff()));

DROP POLICY IF EXISTS "Signed-in users can read links" ON public.forecast_avalanche;
DROP POLICY IF EXISTS "Staff can read links" ON public.forecast_avalanche;
CREATE POLICY "Staff can read links" ON public.forecast_avalanche
  FOR SELECT TO authenticated USING ((SELECT public.is_staff()));

-- Unused translation tables: no policies left, so nobody but the service role
-- can touch them (drop the tables once confirmed unused)
DROP POLICY IF EXISTS "Authenticated users can manage avalanche translations" ON public.avalanche_translations;
DROP POLICY IF EXISTS "Authenticated users can manage forecast translations" ON public.forecast_translations;
DROP POLICY IF EXISTS "Authenticated users can manage problem translations" ON public.problem_translations;
DROP POLICY IF EXISTS "Public can read forecast translations" ON public.forecast_translations;
DROP POLICY IF EXISTS "Public can read problem translations" ON public.problem_translations;

-- partner-logos bucket: staff write (public read stays)
DROP POLICY IF EXISTS "Admins can upload partner logos" ON storage.objects;
DROP POLICY IF EXISTS "Admins can update partner logos" ON storage.objects;
DROP POLICY IF EXISTS "Admins can delete partner logos" ON storage.objects;
DROP POLICY IF EXISTS "Staff can upload partner logos" ON storage.objects;
DROP POLICY IF EXISTS "Staff can update partner logos" ON storage.objects;
DROP POLICY IF EXISTS "Staff can delete partner logos" ON storage.objects;
CREATE POLICY "Staff can upload partner logos" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'partner-logos' AND (SELECT public.is_staff()));
CREATE POLICY "Staff can update partner logos" ON storage.objects
  FOR UPDATE TO authenticated
  USING (bucket_id = 'partner-logos' AND (SELECT public.is_staff()))
  WITH CHECK (bucket_id = 'partner-logos' AND (SELECT public.is_staff()));
CREATE POLICY "Staff can delete partner logos" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'partner-logos' AND (SELECT public.is_staff()));

-- 3. Table grants. RLS was the only barrier: anon held every privilege on most tables.
--    anon keeps exactly what public pages use; TRUNCATE / REFERENCES / TRIGGER go
--    for everyone (the API never needs them).
REVOKE ALL ON ALL TABLES IN SCHEMA public FROM anon;
GRANT SELECT ON public.avalanche_problems, public.forecast_avalanche, public.forecasts,
  public.partners, public.regions, public.weather_stations TO anon;
GRANT INSERT ON public.suspicious_requests TO anon;

REVOKE TRUNCATE, REFERENCES, TRIGGER ON ALL TABLES IN SCHEMA public FROM authenticated;
REVOKE ALL ON public.avalanche_translations, public.forecast_translations,
  public.problem_translations FROM authenticated;

-- 4. Functions
-- Trigger function: the trigger fires without EXECUTE, so nobody needs to call it
REVOKE ALL ON FUNCTION public.handle_auth_user_email_update() FROM public, anon, authenticated;

-- Device tokens (mobile app, in development): reachable only through the service role.
-- Guarded: the table and function exist on production only.
DO $$
BEGIN
  IF to_regprocedure('public.upsert_device_token(text,text,text,text,text)') IS NOT NULL THEN
    ALTER FUNCTION public.upsert_device_token(text, text, text, text, text) SET search_path = public;
    REVOKE ALL ON FUNCTION public.upsert_device_token(text, text, text, text, text)
      FROM public, anon, authenticated;
    GRANT EXECUTE ON FUNCTION public.upsert_device_token(text, text, text, text, text) TO service_role;
  END IF;

  IF to_regclass('public.device_tokens') IS NOT NULL THEN
    REVOKE ALL ON public.device_tokens FROM anon, authenticated;
  END IF;
END
$$;

-- Pin search_path on the helper and trigger functions flagged by the Security Advisor.
-- generate_verification_code uses pgcrypto (gen_random_bytes), which lives in `extensions`.
DO $$
DECLARE
  fn record;
BEGIN
  FOR fn IN
    SELECT p.oid::regprocedure AS signature, p.proname
    FROM pg_proc p
    WHERE p.pronamespace = 'public'::regnamespace
      AND p.proname IN (
        'auto_sort_weather_station', 'generate_member_id', 'generate_verification_code',
        'set_updated_at', 'update_members_updated_at', 'update_updated_at_column'
      )
  LOOP
    EXECUTE format(
      'ALTER FUNCTION %s SET search_path = %s',
      fn.signature,
      CASE WHEN fn.proname = 'generate_verification_code' THEN 'public, extensions' ELSE 'public' END
    );
  END LOOP;
END
$$;
