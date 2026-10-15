-- Admin Team page: staff drag colleagues between sections (Forecasters,
-- Development team, none) and within them. `team_order` is the position in the
-- section; the public Team page lists people in that order.
ALTER TABLE public.user_profiles
  ADD COLUMN IF NOT EXISTS team_order int;

-- Users still can't change their own section or position: the own-profile
-- update policy locks role, team and now team_order
DROP POLICY IF EXISTS "user can update own profile" ON public.user_profiles;
CREATE POLICY "user can update own profile"
  ON public.user_profiles FOR UPDATE
  TO authenticated
  USING (id = auth.uid())
  WITH CHECK (
    id = auth.uid()
    AND role = (SELECT role FROM public.user_profiles WHERE id = auth.uid())
    AND team IS NOT DISTINCT FROM (SELECT team FROM public.user_profiles WHERE id = auth.uid())
    AND team_order IS NOT DISTINCT FROM (SELECT team_order FROM public.user_profiles WHERE id = auth.uid())
  );

-- Saves the whole board in one go: updates = [{ id, team, team_order }, …],
-- team null = no section. SECURITY DEFINER (profiles are owner-only), so it
-- checks is_staff() itself and only touches staff profiles.
CREATE OR REPLACE FUNCTION public.reorder_team_profiles(updates jsonb)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT public.is_staff() THEN
    RAISE EXCEPTION 'forbidden' USING ERRCODE = '42501';
  END IF;

  UPDATE public.user_profiles p
  SET
    team = (elem->>'team')::public.team_section,
    team_order = (elem->>'team_order')::int
  FROM jsonb_array_elements(updates) AS elem
  WHERE p.id = (elem->>'id')::uuid
    AND p.role IN ('admin', 'forecaster');
END;
$$;

REVOKE ALL ON FUNCTION public.reorder_team_profiles(jsonb) FROM public, anon;
GRANT EXECUTE ON FUNCTION public.reorder_team_profiles(jsonb) TO authenticated;

-- The admin list also needs the position; RETURNS TABLE changes, so drop first
DROP FUNCTION IF EXISTS public.get_team_profiles();
CREATE FUNCTION public.get_team_profiles()
RETURNS TABLE (
  id uuid,
  first_name text,
  last_name text,
  avatar_url text,
  team public.team_section,
  team_order int,
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
  SELECT p.id, p.first_name, p.last_name, p.avatar_url, p.team, p.team_order, p.is_public
  FROM public.user_profiles p
  WHERE p.role IN ('admin', 'forecaster')
  ORDER BY p.team_order NULLS LAST, p.first_name, p.last_name;
END;
$$;

REVOKE ALL ON FUNCTION public.get_team_profiles() FROM public, anon;
GRANT EXECUTE ON FUNCTION public.get_team_profiles() TO authenticated;
