import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin()

const nextConfig: NextConfig = {
  webpack(config) {
    // SVG as React component
    config.module.rules.push({
      resourceQuery: /component/,
      test: /\.svg$/i, // "?component"
      use: ['@svgr/webpack'],
    })

    // SVG as static file (default Next.js behavior)
    config.module.rules.push({
      resourceQuery: { not: /component/ },
      test: /\.svg$/i,
      type: 'asset/resource',
    })

    return config
  },
}

export default withNextIntl(nextConfig)
