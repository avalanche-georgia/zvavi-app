-- Fix: "Allow all users to update" let ANY role (including anon) update ANY
-- column on ANY recent_avalanches row via the public anon key. Harmless while
-- the table only held team-authored data, but now that source/status/photo_keys
-- drive moderation (admin surface, later PRs), an open UPDATE policy would let
-- anyone bypass moderation entirely from the browser console.
-- Restrict to authenticated, matching the existing INSERT/DELETE policies on
-- this table. No legitimate flow breaks — the admin UI already only runs
-- authenticated.

DROP POLICY IF EXISTS "Allow all users to update" ON public.recent_avalanches;
DROP POLICY IF EXISTS "Allow update for authenticated users" ON public.recent_avalanches;

CREATE POLICY "Allow update for authenticated users"
  ON public.recent_avalanches
  FOR UPDATE
  TO public
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');
