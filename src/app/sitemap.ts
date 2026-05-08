import type { MetadataRoute } from 'next'
import { locales } from 'src/i18n/config'

import { createClient } from '@/lib/supabase/server'
import { baseUrl, routes } from '@/routes'

type StaticEntry = {
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']
  path: string
  priority: number
}

const staticEntries: StaticEntry[] = [
  { changeFrequency: 'monthly', path: routes.weatherStations, priority: 0.8 },
  { changeFrequency: 'monthly', path: routes.about.aboutUs, priority: 0.7 },
  { changeFrequency: 'monthly', path: routes.partners, priority: 0.7 },
  { changeFrequency: 'monthly', path: routes.about.contact, priority: 0.6 },
  { changeFrequency: 'monthly', path: routes.about.joinUs, priority: 0.5 },
]

type RegionForecastEntry = {
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']
  getPath: (regionId: string) => string
  priority: number
}

const regionForecastEntries: RegionForecastEntry[] = [
  {
    changeFrequency: 'daily',
    getPath: (regionId) => routes.forecastsByRegion(regionId).root,
    priority: 1,
  },
  {
    changeFrequency: 'daily',
    getPath: (regionId) => routes.forecastsByRegion(regionId).current,
    priority: 0.9,
  },
  {
    changeFrequency: 'weekly',
    getPath: (regionId) => routes.forecastsByRegion(regionId).history,
    priority: 0.8,
  },
]

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const supabase = await createClient()
  const { data } = await supabase
    .from('regions')
    .select('id')
    .eq('is_active', true)
    .order('display_order', { ascending: true })

  const activeRegionIds = (data ?? []).map((r) => r.id as string)

  const regionEntries: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    activeRegionIds.flatMap((regionId) =>
      regionForecastEntries.map(({ changeFrequency, getPath, priority }) => {
        const path = getPath(regionId)

        return {
          alternates: {
            languages: Object.fromEntries(locales.map((l) => [l, `${baseUrl}/${l}${path}`])),
          },
          changeFrequency,
          lastModified: new Date(),
          priority,
          url: `${baseUrl}/${locale}${path}`,
        }
      }),
    ),
  )

  const staticSitemapEntries: MetadataRoute.Sitemap = staticEntries.flatMap(
    ({ changeFrequency, path, priority }) =>
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

  return [...regionEntries, ...staticSitemapEntries]
}

export default sitemap
