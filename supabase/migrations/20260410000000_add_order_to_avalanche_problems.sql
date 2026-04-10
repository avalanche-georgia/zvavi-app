ALTER TABLE "public"."avalanche_problems"
  ADD COLUMN "order" integer NOT NULL DEFAULT 0;

-- Set order for existing rows based on insertion order (id) within each forecast
WITH ranked AS (
  SELECT id, (ROW_NUMBER() OVER (PARTITION BY forecast_id ORDER BY id) - 1) AS row_order
  FROM "public"."avalanche_problems"
)
UPDATE "public"."avalanche_problems" ap
SET "order" = ranked.row_order
FROM ranked
WHERE ap.id = ranked.id;
