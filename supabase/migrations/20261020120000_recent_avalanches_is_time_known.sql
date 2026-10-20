-- An avalanche's time of day is optional. is_time_known says whether `date`
-- carries a real time; when false only its day counts (00:00 is not "unknown").
-- Existing records have no time.
ALTER TABLE public.recent_avalanches
  ADD COLUMN is_time_known boolean NOT NULL DEFAULT false;

-- Public submissions can include the time. A new parameter changes the
-- signature, so the old function is dropped first — CREATE OR REPLACE would add
-- an overload instead.
DROP FUNCTION IF EXISTS public.submit_observation(
  region_id, numeric, numeric, timestamptz, boolean, avalanche_type, avalanche_trigger,
  bigint, jsonb, text, text, text, text, bigint, numeric, numeric, text[], text
);

CREATE FUNCTION public.submit_observation(
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
  p_width                numeric default null,
  p_photo_keys           text[] default null,
  p_location             text default null,
  p_is_time_known        boolean default false
) RETURNS bigint
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_new_id bigint;
BEGIN
  IF coalesce(array_length(p_photo_keys, 1), 0) > 3 THEN
    RAISE EXCEPTION 'too many photos (max 3)';
  END IF;

  INSERT INTO recent_avalanches (
    region_id, latitude, longitude, date, is_date_unknown, is_time_known, type, trigger,
    size, aspects, description, submitter_name, submitter_contact, submitter_education,
    source, status, quantity, slab_depth, width, photo_keys, location
  ) VALUES (
    p_region_id, p_latitude, p_longitude, p_date, p_is_date_unknown,
    -- No date, no time
    p_is_time_known AND p_date IS NOT NULL AND NOT p_is_date_unknown,
    p_type, p_trigger,
    p_size, p_aspects, p_description, p_submitter_name, p_submitter_contact, p_submitter_education,
    'external', 'pending', p_quantity, p_slab_depth, p_width, nullif(p_photo_keys, '{}'), p_location
  )
  RETURNING id INTO v_new_id;

  RETURN v_new_id;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.submit_observation FROM public, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.submit_observation TO service_role;
