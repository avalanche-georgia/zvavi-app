-- Adds optional quantity, slab_depth, and width params to submit_observation,
-- previously either hardcoded (quantity=1) or entirely unavailable to public
-- submitters. All appended with defaults, so this is backward compatible
-- with the existing call in POST /api/observations until that's updated to
-- pass them.
--
-- `involvement` and `location` (free text) are deliberately NOT exposed here —
-- involvement is treated as internal-only across the app (see its "(internal)"
-- label on the forecast-nested avalanche form), and location was left out of
-- the public form's scope by product decision.

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
  p_submitter_education  text default null,
  p_quantity             bigint default 1,
  p_slab_depth           numeric default null,
  p_width                numeric default null
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
    source, status, quantity, slab_depth, width
  ) VALUES (
    p_region_id, p_latitude, p_longitude, p_date, p_is_date_unknown, p_type, p_trigger,
    p_size, p_aspects, p_description, p_submitter_name, p_submitter_contact, p_submitter_education,
    'external', 'published', p_quantity, p_slab_depth, p_width
  )
  RETURNING id INTO v_new_id;

  RETURN v_new_id;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.submit_observation FROM public, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.submit_observation TO service_role;
