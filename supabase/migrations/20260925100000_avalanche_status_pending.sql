-- Adds the `pending` status: an external observation awaiting moderation.
-- Team records never enter it. See local/observations/model.md.
--
-- Kept in its own migration: a new enum value can't be used in the same
-- transaction that adds it (submit_observation switches to it in the next one).
ALTER TYPE public.avalanche_status ADD VALUE IF NOT EXISTS 'pending';
