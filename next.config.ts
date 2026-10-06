import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

const nextConfig: NextConfig = {
  // Build's git commit, attached to analytics and error events (Vercel sets VERCEL_GIT_COMMIT_SHA)
  env: {
    NEXT_PUBLIC_APP_RELEASE: process.env.VERCEL_GIT_COMMIT_SHA ?? '',
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

export default withNextIntl(nextConfig)
