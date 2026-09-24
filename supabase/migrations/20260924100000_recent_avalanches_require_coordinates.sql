-- Every new avalanche record (public observation or team entry) must have
-- coordinates. Existing rows without them are legacy data that can't be
-- backfilled, so this is a trigger rather than NOT NULL / a CHECK constraint:
--   - INSERT: coordinates are required.
--   - UPDATE: a row that already has coordinates can't lose them; a legacy
--     row without coordinates stays editable.
CREATE OR REPLACE FUNCTION public.recent_avalanches_require_coordinates()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  IF NEW.latitude IS NOT NULL AND NEW.longitude IS NOT NULL THEN
    RETURN NEW;
  END IF;

  IF TG_OP = 'INSERT' OR (OLD.latitude IS NOT NULL AND OLD.longitude IS NOT NULL) THEN
    RAISE EXCEPTION 'latitude and longitude are required'
      USING ERRCODE = 'check_violation';
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS recent_avalanches_require_coordinates ON public.recent_avalanches;

CREATE TRIGGER recent_avalanches_require_coordinates
  BEFORE INSERT OR UPDATE OF latitude, longitude ON public.recent_avalanches
  FOR EACH ROW
  EXECUTE FUNCTION public.recent_avalanches_require_coordinates();
