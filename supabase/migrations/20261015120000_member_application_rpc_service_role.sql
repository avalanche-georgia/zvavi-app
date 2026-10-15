-- submit_member_application is SECURITY DEFINER and was callable by anyone with the
-- anon key, skipping all validation. Applications now go through
-- POST /api/members/applications (server-side validation, honeypot), which calls it
-- with the service role — the only role left that may execute it.
REVOKE EXECUTE ON FUNCTION public.submit_member_application FROM public, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.submit_member_application TO service_role;
