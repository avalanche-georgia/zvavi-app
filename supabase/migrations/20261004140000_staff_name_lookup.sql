-- Signed-in staff see who logged a record (first + last name only).
-- user_profiles rows stay readable only by their owner
-- (20261004120001_restrict_public_reads.sql), so colleagues' emails and roles
-- aren't exposed.

CREATE OR REPLACE FUNCTION public.get_staff_name(p_id uuid)
RETURNS text
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT nullif(btrim(concat_ws(' ', first_name, last_name)), '')
  FROM public.user_profiles
  WHERE id = p_id;
$$;

REVOKE ALL ON FUNCTION public.get_staff_name(uuid) FROM public, anon;
GRANT EXECUTE ON FUNCTION public.get_staff_name(uuid) TO authenticated;
