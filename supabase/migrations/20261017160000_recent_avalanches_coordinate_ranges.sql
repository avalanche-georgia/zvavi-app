-- Coordinates must be real: latitude -90..90, longitude -180..180 (same limits
-- as the forms and API). Legacy team records once held values like 1e24, which
-- lock up the public map. NULL stays allowed (legacy rows without coordinates,
-- see recent_avalanches_require_coordinates).
ALTER TABLE public.recent_avalanches
  ADD CONSTRAINT recent_avalanches_latitude_range
    CHECK (latitude BETWEEN -90 AND 90),
  ADD CONSTRAINT recent_avalanches_longitude_range
    CHECK (longitude BETWEEN -180 AND 180);
