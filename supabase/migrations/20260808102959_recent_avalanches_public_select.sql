-- "Allow read access for all users" (USING (true)) let anon read every
-- recent_avalanches row directly via the anon key — including external
-- observations still in draft/archived status and their submitter_contact /
-- submitter_education PII. RLS is row-level only, so it can't hide those
-- columns on rows anon is otherwise allowed to see — anon is restricted to
-- `source = 'team'` rows entirely instead.
--
-- Existing public fetchers (fetchForecastPageData, useGetCurrentForecast,
-- useGetForecast) only ever read team-sourced rows via forecast_avalanche
-- joins, so this changes nothing for them. The public observations feed
-- (external + published, name only, no contact/education) reads through
-- GET /api/observations using the service-role client with an explicit
-- column list instead, the same service-role boundary already used for
-- submit_observation writes.

DROP POLICY IF EXISTS "Allow read access for all users" ON public.recent_avalanches;

CREATE POLICY "Allow anon to read team-authored avalanches"
  ON public.recent_avalanches
  FOR SELECT
  TO anon
  USING (source = 'team');

CREATE POLICY "Allow authenticated to read all avalanches"
  ON public.recent_avalanches
  FOR SELECT
  TO authenticated
  USING (true);
