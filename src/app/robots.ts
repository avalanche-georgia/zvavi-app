import type { MetadataRoute } from 'next'

const robots = (): MetadataRoute.Robots => ({
  host: 'https://avalanche.ge',
  rules: {
    allow: '/',
    disallow: ['/*/admin/', '/*/auth/'],
    userAgent: '*',
  },
  sitemap: 'https://avalanche.ge/sitemap.xml',
})

export default robots
