-- Evaluate the role check once per statement instead of once per row:
-- `(select fn())` lets Postgres run it as an InitPlan (e.g. save_forecast's
-- DELETE of a forecast's problems). Same rules as
-- 20261004120000_forecasts_editor_only_writes.sql.

DROP POLICY IF EXISTS "Editors can insert forecasts" ON public.forecasts;
DROP POLICY IF EXISTS "Editors can update forecasts" ON public.forecasts;
DROP POLICY IF EXISTS "Editors can delete forecasts" ON public.forecasts;
CREATE POLICY "Editors can insert forecasts" ON public.forecasts
  FOR INSERT TO authenticated WITH CHECK ((SELECT public.can_edit_forecasts()));
CREATE POLICY "Editors can update forecasts" ON public.forecasts
  FOR UPDATE TO authenticated
  USING ((SELECT public.can_edit_forecasts())) WITH CHECK ((SELECT public.can_edit_forecasts()));
CREATE POLICY "Editors can delete forecasts" ON public.forecasts
  FOR DELETE TO authenticated USING ((SELECT public.can_edit_forecasts()));

DROP POLICY IF EXISTS "Editors can insert problems" ON public.avalanche_problems;
DROP POLICY IF EXISTS "Editors can update problems" ON public.avalanche_problems;
DROP POLICY IF EXISTS "Editors can delete problems" ON public.avalanche_problems;
CREATE POLICY "Editors can insert problems" ON public.avalanche_problems
  FOR INSERT TO authenticated WITH CHECK ((SELECT public.can_edit_forecasts()));
CREATE POLICY "Editors can update problems" ON public.avalanche_problems
  FOR UPDATE TO authenticated
  USING ((SELECT public.can_edit_forecasts())) WITH CHECK ((SELECT public.can_edit_forecasts()));
CREATE POLICY "Editors can delete problems" ON public.avalanche_problems
  FOR DELETE TO authenticated USING ((SELECT public.can_edit_forecasts()));

DROP POLICY IF EXISTS "Editors can insert links" ON public.forecast_avalanche;
DROP POLICY IF EXISTS "Editors can update links" ON public.forecast_avalanche;
DROP POLICY IF EXISTS "Editors can delete links" ON public.forecast_avalanche;
CREATE POLICY "Editors can insert links" ON public.forecast_avalanche
  FOR INSERT TO authenticated WITH CHECK ((SELECT public.can_edit_forecasts()));
CREATE POLICY "Editors can update links" ON public.forecast_avalanche
  FOR UPDATE TO authenticated
  USING ((SELECT public.can_edit_forecasts())) WITH CHECK ((SELECT public.can_edit_forecasts()));
CREATE POLICY "Editors can delete links" ON public.forecast_avalanche
  FOR DELETE TO authenticated USING ((SELECT public.can_edit_forecasts()));
