-- Every avalanche problem carries a size (1–5). The form requires it, and the
-- save_forecast RPC rejects problems without one; this makes it hold at the
-- table level too. Pre-checked: no NULL or out-of-range rows exist.
ALTER TABLE public.avalanche_problems
  ALTER COLUMN avalanche_size SET NOT NULL,
  ADD CONSTRAINT avalanche_problems_size_range CHECK (avalanche_size BETWEEN 1 AND 5);
