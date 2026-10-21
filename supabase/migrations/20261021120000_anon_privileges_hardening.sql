-- Access review follow-ups (see 20261016110000_staff_only_access.sql).

-- 1. Sequences: REVOKE ALL ON ALL TABLES didn't cover them, so anon could still
--    read and advance every *_id_seq. Inserts as authenticated keep their grant.
REVOKE ALL ON ALL SEQUENCES IN SCHEMA public FROM anon;

-- 2. New objects created by postgres (migrations) no longer auto-grant to anon.
--    A table a public page reads gets an explicit GRANT SELECT ... TO anon.
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public REVOKE ALL ON TABLES FROM anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public REVOKE ALL ON SEQUENCES FROM anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public REVOKE ALL ON FUNCTIONS FROM public, anon;

-- 3. get_staff_name: staff only — any other signed-in account gets null
CREATE OR REPLACE FUNCTION public.get_staff_name(p_id uuid)
RETURNS text
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT nullif(btrim(concat_ws(' ', first_name, last_name)), '')
  FROM public.user_profiles
  WHERE id = p_id AND public.is_staff();
$$;
