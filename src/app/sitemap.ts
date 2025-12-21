import type { MetadataRoute } from 'next'

import { routes } from '@/routes'

const sitemap = (): MetadataRoute.Sitemap => [
  {
    changeFrequency: 'daily',
    lastModified: new Date(),
    priority: 1,
    url: 'https://avalanche.ge',
  },
  {
    changeFrequency: 'daily',
    lastModified: new Date(),
    priority: 0.9,
    url: `https://avalanche.ge${routes.currentForecast}`,
  },
  {
    changeFrequency: 'monthly',
    lastModified: new Date(),
    priority: 0.7,
    url: `https://avalanche.ge${routes.about}`,
  },
  {
    changeFrequency: 'monthly',
    lastModified: new Date(),
    priority: 0.7,
    url: `https://avalanche.ge${routes.partners}`,
  },
  {
    changeFrequency: 'monthly',
    lastModified: new Date(),
    priority: 0.6,
    url: `https://avalanche.ge${routes.contact}`,
  },
  {
    changeFrequency: 'monthly',
    lastModified: new Date(),
    priority: 0.5,
    url: `https://avalanche.ge${routes.joinUs}`,
  },
  {
    changeFrequency: 'weekly',
    lastModified: new Date(),
    priority: 0.8,
    url: `https://avalanche.ge${routes.history}`,
  },
  {
    changeFrequency: 'monthly',
    lastModified: new Date(),
    priority: 0.8,
    url: `https://avalanche.ge${routes.weatherStations}`,
  },
]

export default sitemap
