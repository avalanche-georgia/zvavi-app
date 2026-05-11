-- =============================================================================
-- Migration: extend user_profiles
-- Safe to run on a fresh instance. Each step is idempotent.
--
-- If this migration was partially applied on a live instance (e.g. via manual
-- SQL), the statements below are written to be re-runnable without errors.
-- =============================================================================

-- Step 1: Create user_role enum (skip if already exists)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role' AND typnamespace = 'public'::regnamespace) THEN
    CREATE TYPE public.user_role AS ENUM ('admin', 'forecaster', 'trainee');
  END IF;
END
$$;

-- Step 2: Convert role column from text to user_role enum
--   Drop check constraint first — it compares role = text, which breaks the cast.
ALTER TABLE public.user_profiles
  DROP CONSTRAINT IF EXISTS user_profiles_role_check;

ALTER TABLE public.user_profiles
  ALTER COLUMN role DROP DEFAULT;

ALTER TABLE public.user_profiles
  ALTER COLUMN role TYPE public.user_role
    USING role::public.user_role;

ALTER TABLE public.user_profiles
  ALTER COLUMN role SET DEFAULT 'trainee'::public.user_role;

-- Step 3: Drop legacy name column
ALTER TABLE public.user_profiles
  DROP COLUMN IF EXISTS name;

-- Step 4: Add new profile fields
ALTER TABLE public.user_profiles
  ADD COLUMN IF NOT EXISTS first_name text,
  ADD COLUMN IF NOT EXISTS last_name  text,
  ADD COLUMN IF NOT EXISTS about      text,
  ADD COLUMN IF NOT EXISTS avatar_url text;

-- Step 5: Auto-create profile row when a new auth user is created
CREATE OR REPLACE FUNCTION public.handle_new_auth_user()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email, role)
  VALUES (NEW.id, NEW.email, 'trainee')
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_auth_user();

-- Step 6: Backfill profile rows for existing auth users
INSERT INTO public.user_profiles (id, email, role)
SELECT u.id, u.email, 'trainee'
FROM auth.users u
LEFT JOIN public.user_profiles p ON p.id = u.id
WHERE p.id IS NULL
ON CONFLICT (id) DO NOTHING;

-- Step 7: RLS — user can update only their own profile
DROP POLICY IF EXISTS "user can update own profile" ON public.user_profiles;
CREATE POLICY "user can update own profile"
  ON public.user_profiles FOR UPDATE
  TO authenticated
  USING (id = auth.uid())
  WITH CHECK (id = auth.uid());

-- Step 8: Storage — avatars bucket (public, 5 MB limit, images only)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('avatars', 'avatars', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp'])
ON CONFLICT (id) DO UPDATE SET
  public             = EXCLUDED.public,
  file_size_limit    = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

-- Step 9: Storage policies
DROP POLICY IF EXISTS "authenticated upload avatars"     ON storage.objects;
DROP POLICY IF EXISTS "public read avatars"              ON storage.objects;
DROP POLICY IF EXISTS "authenticated delete own avatars" ON storage.objects;

CREATE POLICY "authenticated upload avatars"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'avatars');

CREATE POLICY "public read avatars"
  ON storage.objects FOR SELECT TO public
  USING (bucket_id = 'avatars');

CREATE POLICY "authenticated delete own avatars"
  ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'avatars' AND name LIKE auth.uid()::text || '/%');
