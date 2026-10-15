-- Profile: a short role on the team, shown as the badge on the public Team page
-- (falls back to the section name when empty), and up to five social links.
--
-- Both are edited by the person themselves (own-profile update policy), so the
-- limits live in the database too, not only in the form: links are rendered as
-- hrefs on a public page, so anything but https (e.g. javascript:) is refused.

-- Every link is a plain https URL
CREATE OR REPLACE FUNCTION public.are_https_urls(urls text[])
RETURNS boolean
LANGUAGE sql
IMMUTABLE
SET search_path = ''
AS $$
  SELECT coalesce(bool_and(url ~ '^https://[^\s/$.?#][^\s]*$' AND char_length(url) <= 300), true)
  FROM unnest(urls) AS url;
$$;

ALTER TABLE public.user_profiles
  ADD COLUMN IF NOT EXISTS team_title text,
  ADD COLUMN IF NOT EXISTS social_links text[] NOT NULL DEFAULT '{}';

ALTER TABLE public.user_profiles
  DROP CONSTRAINT IF EXISTS user_profiles_team_title_length,
  ADD CONSTRAINT user_profiles_team_title_length
    CHECK (team_title IS NULL OR char_length(team_title) BETWEEN 1 AND 24);

ALTER TABLE public.user_profiles
  DROP CONSTRAINT IF EXISTS user_profiles_social_links_valid,
  ADD CONSTRAINT user_profiles_social_links_valid
    CHECK (cardinality(social_links) <= 5 AND public.are_https_urls(social_links));
