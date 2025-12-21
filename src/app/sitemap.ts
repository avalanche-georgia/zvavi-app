import type { MetadataRoute } from 'next'
import { locales } from 'src/i18n/config'

import { baseUrl, routes } from '@/routes'

type SitemapEntry = {
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']
  path: string
  priority: number
}

const sitemapEntries: SitemapEntry[] = [
  { changeFrequency: 'daily', path: '', priority: 1 },
  { changeFrequency: 'daily', path: routes.currentForecast, priority: 0.9 },
  { changeFrequency: 'weekly', path: routes.history, priority: 0.8 },
  { changeFrequency: 'monthly', path: routes.weatherStations, priority: 0.8 },
  { changeFrequency: 'monthly', path: routes.about, priority: 0.7 },
  { changeFrequency: 'monthly', path: routes.partners, priority: 0.7 },
  { changeFrequency: 'monthly', path: routes.contact, priority: 0.6 },
  { changeFrequency: 'monthly', path: routes.joinUs, priority: 0.5 },
]

const sitemap = (): MetadataRoute.Sitemap =>
  sitemapEntries.flatMap(({ changeFrequency, path, priority }) =>
    locales.map((locale) => ({
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [l, `${baseUrl}/${l}${path}`])),
      },
      changeFrequency,
      lastModified: new Date(),
      priority,
      url: `${baseUrl}/${locale}${path}`,
    })),
  )

export default sitemap
