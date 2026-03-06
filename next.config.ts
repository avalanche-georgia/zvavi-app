import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

const nextConfig: NextConfig = {
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
