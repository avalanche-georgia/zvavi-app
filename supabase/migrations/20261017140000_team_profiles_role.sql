-- get_team_profiles also returns the role: the forecast form's forecaster
-- picker hides admin accounts (development/testing) from forecasters.
-- The return type changes, so the function is recreated.
DROP FUNCTION IF EXISTS public.get_team_profiles();
CREATE FUNCTION public.get_team_profiles()
RETURNS TABLE (
  id uuid,
  first_name text,
  last_name text,
  avatar_url text,
  team public.team_section,
  team_order int,
  is_public boolean,
  role public.user_role
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
  SELECT p.id, p.first_name, p.last_name, p.avatar_url, p.team, p.team_order, p.is_public, p.role
  FROM public.user_profiles p
  WHERE p.role IN ('admin', 'forecaster')
  ORDER BY p.team_order NULLS LAST, p.first_name, p.last_name;
END;
$$;
REVOKE ALL ON FUNCTION public.get_team_profiles() FROM public, anon;
GRANT EXECUTE ON FUNCTION public.get_team_profiles() TO authenticated;
