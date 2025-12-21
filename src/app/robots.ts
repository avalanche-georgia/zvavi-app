import type { MetadataRoute } from 'next'

import { baseUrl } from '@/routes'

const robots = (): MetadataRoute.Robots => ({
  host: baseUrl,
  rules: {
    allow: '/',
    disallow: ['/*/admin/', '/*/auth/'],
    userAgent: '*',
  },
  sitemap: `${baseUrl}/sitemap.xml`,
})

export default robots
