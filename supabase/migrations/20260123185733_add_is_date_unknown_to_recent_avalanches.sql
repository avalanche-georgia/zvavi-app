-- Add is_date_unknown column to recent_avalanches table
ALTER TABLE "public"."recent_avalanches"
ADD COLUMN "is_date_unknown" boolean NOT NULL DEFAULT false;

-- Make date column nullable (required when is_date_unknown is true)
ALTER TABLE "public"."recent_avalanches"
ALTER COLUMN "date" DROP NOT NULL;
