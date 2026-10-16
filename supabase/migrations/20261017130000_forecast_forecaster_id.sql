-- Forecasts link to their forecaster's profile. `forecaster` (text) stays as
-- the name snapshot and the fallback: legacy rows, a guest forecaster, a
-- deleted account. The public forecast links the name to the person's Team
-- profile when they have a public one.
--
-- forecaster_id is readable with the rest of a published forecast; the name it
-- points to is public already.

ALTER TABLE public.forecasts
  ADD COLUMN IF NOT EXISTS forecaster_id uuid
    REFERENCES public.user_profiles (id) ON DELETE SET NULL;

-- Backs the foreign key (ON DELETE SET NULL looks rows up by forecaster_id)
CREATE INDEX IF NOT EXISTS forecasts_forecaster_id_idx ON public.forecasts (forecaster_id);

-- Existing forecasts: link a name that matches exactly one staff member
UPDATE public.forecasts AS forecast
SET forecaster_id = staff.id
FROM (
  SELECT lower(btrim(concat_ws(' ', first_name, last_name))) AS full_name,
         (array_agg(id))[1] AS id
  FROM public.user_profiles
  WHERE role IN ('admin', 'forecaster')
  GROUP BY 1
  HAVING count(*) = 1
) AS staff
WHERE forecast.forecaster_id IS NULL
  AND staff.full_name <> ''
  AND lower(btrim(forecast.forecaster)) = staff.full_name;

-- Is this profile staff? For save_forecast, which runs as the caller and can't
-- read colleagues' profiles. Answers staff callers only.
CREATE OR REPLACE FUNCTION public.is_staff_profile(p_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT public.is_staff() AND EXISTS (
    SELECT 1 FROM public.user_profiles
    WHERE id = p_id AND role IN ('admin', 'forecaster')
  );
$$;

REVOKE ALL ON FUNCTION public.is_staff_profile(uuid) FROM public, anon;
GRANT EXECUTE ON FUNCTION public.is_staff_profile(uuid) TO authenticated;

-- save_forecast: same as 20261004120000, plus forecaster_id
CREATE OR REPLACE FUNCTION public.save_forecast(
  p_forecast      jsonb,
  p_problems      jsonb,
  p_avalanche_ids bigint[]
) RETURNS bigint
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
DECLARE
  v_id     bigint := nullif(p_forecast->>'id', '')::bigint;
  v_region region_id := (p_forecast->>'region_id')::region_id;
  v_ids    bigint[] := coalesce(p_avalanche_ids, '{}');
  v_forecaster_id uuid := nullif(p_forecast->>'forecaster_id', '')::uuid;
  v_stored_forecaster_id uuid;
BEGIN
  IF NOT public.can_edit_forecasts() THEN
    RAISE EXCEPTION 'not authorized' USING ERRCODE = '42501';
  END IF;

  IF v_region IS NULL THEN
    RAISE EXCEPTION 'region_id is required' USING ERRCODE = '22023';
  END IF;

  -- Hazard levels are stored as the strings '0'..'5'
  IF jsonb_typeof(p_forecast->'hazard_levels') IS DISTINCT FROM 'object' OR EXISTS (
    SELECT 1 FROM jsonb_each(p_forecast->'hazard_levels') AS level
    WHERE jsonb_typeof(level.value) <> 'string'
       OR level.value #>> '{}' NOT IN ('0', '1', '2', '3', '4', '5')
  ) THEN
    RAISE EXCEPTION 'invalid hazard levels' USING ERRCODE = '22023';
  END IF;

  -- A linked forecaster must be staff when picked. An unchanged link is kept
  -- even if that person has left the team since.
  IF v_id IS NOT NULL THEN
    SELECT forecaster_id INTO v_stored_forecaster_id
    FROM forecasts WHERE id = v_id AND region_id = v_region;
  END IF;

  IF v_forecaster_id IS DISTINCT FROM v_stored_forecaster_id
     AND v_forecaster_id IS NOT NULL
     AND NOT public.is_staff_profile(v_forecaster_id) THEN
    RAISE EXCEPTION 'forecaster is not staff' USING ERRCODE = '22023';
  END IF;

  IF v_id IS NULL THEN
    INSERT INTO forecasts (region_id, forecaster, forecaster_id, valid_until, summary, snowpack, weather,
                           additional_hazards, hazard_levels)
    VALUES (v_region,
            p_forecast->>'forecaster',
            v_forecaster_id,
            (p_forecast->>'valid_until')::timestamptz,
            p_forecast->>'summary',
            p_forecast->>'snowpack',
            p_forecast->>'weather',
            p_forecast->>'additional_hazards',
            p_forecast->'hazard_levels')
    RETURNING id INTO v_id;
  ELSE
    UPDATE forecasts SET
      forecaster         = p_forecast->>'forecaster',
      forecaster_id      = v_forecaster_id,
      valid_until        = (p_forecast->>'valid_until')::timestamptz,
      summary            = p_forecast->>'summary',
      snowpack           = p_forecast->>'snowpack',
      weather            = p_forecast->>'weather',
      additional_hazards = p_forecast->>'additional_hazards',
      hazard_levels      = p_forecast->'hazard_levels'
    WHERE id = v_id AND region_id = v_region;

    IF NOT FOUND THEN
      RAISE EXCEPTION 'forecast % not found in region %', v_id, v_region USING ERRCODE = 'P0002';
    END IF;
  END IF;

  -- Problems belong to the forecast: replace them, keeping the array order
  DELETE FROM avalanche_problems WHERE forecast_id = v_id;

  INSERT INTO avalanche_problems (forecast_id, "order", type, avalanche_size, sensitivity,
                                  distribution, confidence, trend, aspects, description,
                                  time_of_day, is_all_day)
  SELECT v_id,
         (problem.ord - 1)::integer,
         (problem.item->>'type')::avalanche_type,
         (problem.item->>'avalanche_size')::bigint,
         (problem.item->>'sensitivity')::sensitivity,
         (problem.item->>'distribution')::distribution,
         (problem.item->>'confidence')::confidence,
         (problem.item->>'trend')::trend,
         problem.item->'aspects',
         problem.item->>'description',
         problem.item->'time_of_day',
         coalesce((problem.item->>'is_all_day')::boolean, true)
  FROM jsonb_array_elements(coalesce(p_problems, '[]'::jsonb)) WITH ORDINALITY AS problem(item, ord);

  -- New links must point at real, same-region, non-archived records. Links
  -- that already exist are kept even if their record was archived since.
  IF EXISTS (
    SELECT 1 FROM unnest(v_ids) AS new_id
    WHERE NOT EXISTS (SELECT 1 FROM forecast_avalanche link
                      WHERE link.forecast_id = v_id AND link.avalanche_id = new_id)
      AND NOT EXISTS (SELECT 1 FROM recent_avalanches avalanche
                      WHERE avalanche.id = new_id
                        AND avalanche.region_id = v_region
                        AND avalanche.status <> 'archived')
  ) THEN
    RAISE EXCEPTION 'invalid avalanche link' USING ERRCODE = '22023';
  END IF;

  DELETE FROM forecast_avalanche
   WHERE forecast_id = v_id AND NOT (avalanche_id = ANY (v_ids));

  INSERT INTO forecast_avalanche (forecast_id, avalanche_id)
  SELECT DISTINCT v_id, linked_id FROM unnest(v_ids) AS linked_id
  ON CONFLICT DO NOTHING;

  RETURN v_id;
END;
$$;

REVOKE ALL ON FUNCTION public.save_forecast(jsonb, jsonb, bigint[]) FROM public, anon;
GRANT EXECUTE ON FUNCTION public.save_forecast(jsonb, jsonb, bigint[]) TO authenticated;
