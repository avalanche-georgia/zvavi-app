-- Anonymous observation submission, routed through a SECURITY DEFINER RPC
-- (same precedent as submit_member_application) rather than an anon RLS
-- policy, so the write only happens through /api/observations after its
-- honeypot check — not directly reachable from a browser console.
--
-- No "unknown" sentinel exists for `size` (bigint, NOT NULL, no DB default —
-- see 20260413000001_add_avalanche_fields.sql). That migration backfilled
-- legacy NULL sizes to 1; the RPC default follows the same precedent instead
-- of reopening the column to NULL.

CREATE OR REPLACE FUNCTION public.submit_observation(
  p_region_id            region_id,
  p_latitude             numeric default null,
  p_longitude            numeric default null,
  p_date                 timestamptz default null,
  p_is_date_unknown      boolean default true,
  p_type                 avalanche_type default 'unknown',
  p_trigger              avalanche_trigger default 'unknown',
  p_size                 bigint default 1,
  p_aspects              jsonb default '{"alpine": [], "sub_alpine": [], "high_alpine": []}'::jsonb,
  p_description          text default null,
  p_submitter_name       text default null,
  p_submitter_contact    text default null,
  p_submitter_education  text default null
) RETURNS bigint
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_new_id bigint;
BEGIN
  INSERT INTO recent_avalanches (
    region_id, latitude, longitude, date, is_date_unknown, type, trigger,
    size, aspects, description, submitter_name, submitter_contact, submitter_education,
    source, status, quantity
  ) VALUES (
    p_region_id, p_latitude, p_longitude, p_date, p_is_date_unknown, p_type, p_trigger,
    p_size, p_aspects, p_description, p_submitter_name, p_submitter_contact, p_submitter_education,
    'external', 'published', 1
  )
  RETURNING id INTO v_new_id;

  RETURN v_new_id;
END;
$$;

-- Only the API route's service-role key may call this — not anon, not authenticated.
REVOKE EXECUTE ON FUNCTION public.submit_observation FROM public, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.submit_observation TO service_role;
