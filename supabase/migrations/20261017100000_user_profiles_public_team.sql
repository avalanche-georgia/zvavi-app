-- Public Team page: who is listed, and in which section.
--
-- `team` is the public grouping, kept apart from `role` (permissions): a
-- developer listed under "Development team" gets no forecast-write access, and
-- an admin who forecasts can still be listed under "Forecasters". It is set by
-- an admin (like `role`); null = not on the Team page.
--
-- `is_public` is the person's own consent to be listed, toggled on their
-- profile page. Off by default.
--
-- The page reads listed profiles server-side with the service role and an
-- explicit column list (no email, no role), so anon gets no grant here.

DO $$ BEGIN
  CREATE TYPE public.team_section AS ENUM ('forecasting', 'development');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

ALTER TABLE public.user_profiles
  ADD COLUMN IF NOT EXISTS team public.team_section,
  ADD COLUMN IF NOT EXISTS is_public boolean NOT NULL DEFAULT false;

-- Users still edit their own profile, but neither `role` nor `team`
DROP POLICY IF EXISTS "user can update own profile" ON public.user_profiles;
CREATE POLICY "user can update own profile"
  ON public.user_profiles FOR UPDATE
  TO authenticated
  USING (id = auth.uid())
  WITH CHECK (
    id = auth.uid()
    AND role = (SELECT role FROM public.user_profiles WHERE id = auth.uid())
    AND team IS NOT DISTINCT FROM (SELECT team FROM public.user_profiles WHERE id = auth.uid())
  );

-- Admin Team page: staff see every staff profile's public bits (never email)
-- and switch its visibility. Profiles stay owner-only under RLS, so both go
-- through SECURITY DEFINER functions that check is_staff() themselves.
CREATE OR REPLACE FUNCTION public.get_team_profiles()
RETURNS TABLE (
  id uuid,
  first_name text,
  last_name text,
  avatar_url text,
  team public.team_section,
  is_public boolean
)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT public.is_staff() THEN
    RAISE EXCEPTION 'forbidden' USING ERRCODE = '42501';
  END IF;

  RETURN QUERY
  SELECT p.id, p.first_name, p.last_name, p.avatar_url, p.team, p.is_public
  FROM public.user_profiles p
  WHERE p.role IN ('admin', 'forecaster')
  ORDER BY p.first_name, p.last_name;
END;
$$;

REVOKE ALL ON FUNCTION public.get_team_profiles() FROM public, anon;
GRANT EXECUTE ON FUNCTION public.get_team_profiles() TO authenticated;

CREATE OR REPLACE FUNCTION public.set_profile_public(p_id uuid, p_is_public boolean)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT public.is_staff() THEN
    RAISE EXCEPTION 'forbidden' USING ERRCODE = '42501';
  END IF;

  UPDATE public.user_profiles
  SET is_public = p_is_public
  WHERE id = p_id AND role IN ('admin', 'forecaster');

  IF NOT FOUND THEN
    RAISE EXCEPTION 'profile not found' USING ERRCODE = 'P0002';
  END IF;
END;
$$;

REVOKE ALL ON FUNCTION public.set_profile_public(uuid, boolean) FROM public, anon;
GRANT EXECUTE ON FUNCTION public.set_profile_public(uuid, boolean) TO authenticated;
