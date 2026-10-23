import { withPostHogConfig } from '@posthog/nextjs-config'
import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

// Without a trailing slash, so the pattern below never gets a double one
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/+$/, '')

const nextConfig: NextConfig = {
  // Build's git commit, attached to analytics and error events (Vercel sets VERCEL_GIT_COMMIT_SHA)
  env: {
    NEXT_PUBLIC_APP_RELEASE: process.env.VERCEL_GIT_COMMIT_SHA ?? '',
  },
  images: {
    // Avatars and partner logos are stored under a new name on every upload, so an
    // optimized copy never goes stale
    minimumCacheTTL: 31_536_000,
    // Uploaded photos and logos in Supabase Storage, served resized instead of as uploaded
    remotePatterns: supabaseUrl ? [new URL(`${supabaseUrl}/storage/v1/object/public/**`)] : [],
  },
  // PostHog API calls use trailing slashes; src/proxy.ts handles the redirect for other paths
  skipTrailingSlashRedirect: true,
  transpilePackages: ['@dnd-kit/react'],
  turbopack: {
    rules: {
      './src/assets/icons/brand/*.svg': {
        as: '*.js',
        loaders: [{ loader: '@svgr/webpack', options: { svgo: false } }],
      },
      './src/assets/images/partnerLogos/*.svg': {
        as: '*.js',
        loaders: [{ loader: '@svgr/webpack', options: { svgo: false } }],
      },
    },
  },
}

// Build-time only (never NEXT_PUBLIC_): personal API key with error-tracking write access
const { POSTHOG_API_KEY: posthogApiKey, POSTHOG_PROJECT_ID: posthogProjectId } = process.env

// Without the key (local, preview) the config is exactly as before and no source maps are made.
// With it, source maps are uploaded to PostHog after the production build and then deleted, so
// they are never served publicly. withPostHogConfig must be the outermost wrapper.
export default posthogApiKey
  ? withPostHogConfig(withNextIntl(nextConfig), {
      host: 'https://eu.posthog.com',
      personalApiKey: posthogApiKey,
      projectId: posthogProjectId,
      sourcemaps: { deleteAfterUpload: true, enabled: process.env.NODE_ENV === 'production' },
    })
  : withNextIntl(nextConfig)
