-- Access review, phase 1 (cont.): 20261016110000 made the authenticated read
-- policies on forecasts, problems and links staff-only, but the "published"
-- read policies were created for anon only. A signed-in account that isn't
-- staff (trainee, role-less) matched no policy and saw no public forecast.
-- Extend the published-only policies to authenticated; staff keep reading
-- drafts through the staff policies.
ALTER POLICY "Anyone can read published forecasts" ON public.forecasts
  TO anon, authenticated;

ALTER POLICY "Anyone can read problems of published forecasts" ON public.avalanche_problems
  TO anon, authenticated;

ALTER POLICY "Anyone can read links of published forecasts" ON public.forecast_avalanche
  TO anon, authenticated;
