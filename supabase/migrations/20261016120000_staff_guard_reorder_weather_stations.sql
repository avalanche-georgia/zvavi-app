-- Access review, phase 1 (cont.): reorder_weather_stations is SECURITY DEFINER,
-- so it bypasses the weather_stations policies. EXECUTE is granted to every
-- `authenticated` account; check the caller is staff before writing.
-- CREATE OR REPLACE keeps the existing grants.
CREATE OR REPLACE FUNCTION public.reorder_weather_stations(updates jsonb)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  IF NOT public.is_staff() THEN
    RAISE EXCEPTION 'not allowed' USING ERRCODE = '42501';
  END IF;

  UPDATE public.weather_stations
  SET sort_order = (elem->>'sort_order')::int
  FROM jsonb_array_elements(updates) AS elem
  WHERE id = (elem->>'id')::uuid;
END;
$$;
