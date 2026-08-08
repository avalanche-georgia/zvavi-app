-- =============================================================================
-- Migration: observation fields on recent_avalanches
-- Adds source/status/submitter/photo columns so recent_avalanches can carry
-- both team-authored entries and public-submitted observations.
-- Idempotent — safe to re-run.
-- =============================================================================

-- Step 1: source/status enums
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'avalanche_source' AND typnamespace = 'public'::regnamespace) THEN
    CREATE TYPE public.avalanche_source AS ENUM ('team', 'external');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'avalanche_status' AND typnamespace = 'public'::regnamespace) THEN
    CREATE TYPE public.avalanche_status AS ENUM ('draft', 'published', 'archived');
  END IF;
END
$$;

-- Step 2: new columns
-- source/status default to 'team'/'published' so existing rows backfill in place —
-- no separate UPDATE needed.
ALTER TABLE public.recent_avalanches
  ADD COLUMN IF NOT EXISTS created_by_user_id  uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS source               public.avalanche_source NOT NULL DEFAULT 'team',
  ADD COLUMN IF NOT EXISTS status               public.avalanche_status NOT NULL DEFAULT 'published',
  ADD COLUMN IF NOT EXISTS submitter_name       text,
  ADD COLUMN IF NOT EXISTS submitter_contact    text,
  ADD COLUMN IF NOT EXISTS submitter_education  text,
  ADD COLUMN IF NOT EXISTS photo_keys           text[];
