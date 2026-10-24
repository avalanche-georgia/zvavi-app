import type { RegionId } from '@domain/types'
import type { MetadataRoute } from 'next'
import { defaultLocale, locales } from 'src/i18n/config'

import fetchSitemapForecasts from './fetchSitemapForecasts'

import { reportServerError } from '@/lib/posthog/server'
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
  { changeFrequency: 'monthly', path: routes.about.team, priority: 0.6 },
  { changeFrequency: 'monthly', path: routes.partners, priority: 0.7 },
  { changeFrequency: 'monthly', path: routes.about.contact, priority: 0.6 },
  { changeFrequency: 'monthly', path: routes.about.joinUs, priority: 0.5 },
]

type RegionForecastEntry = {
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']
  getPath: (regionId: RegionId) => string
  priority: number
}

const regionForecastEntries: RegionForecastEntry[] = [
  {
    changeFrequency: 'daily',
    getPath: (regionId) => routes.regionHome(regionId),
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
  {
    changeFrequency: 'monthly',
    getPath: (regionId) => routes.forecastsByRegion(regionId).forecastArea,
    priority: 0.6,
  },
  {
    changeFrequency: 'daily',
    getPath: (regionId) => routes.observationsByRegion(regionId).root,
    priority: 0.7,
  },
]

type EntryOptions = Pick<
  MetadataRoute.Sitemap[number],
  'changeFrequency' | 'lastModified' | 'priority'
>

// One entry per locale, each with hreflang alternates
const toLocalizedEntries = (path: string, options: EntryOptions): MetadataRoute.Sitemap =>
  locales.map((locale) => ({
    ...options,
    alternates: {
      languages: {
        ...Object.fromEntries(
          locales.map((pageLocale) => [pageLocale, `${baseUrl}/${pageLocale}${path}`]),
        ),
        'x-default': `${baseUrl}/${defaultLocale}${path}`,
      },
    },
    url: `${baseUrl}/${locale}${path}`,
  }))

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('regions')
    .select('id')
    .eq('is_active', true)
    .order('display_order', { ascending: true })

  if (error) {
    reportServerError(new Error(error.message), { scope: 'sitemap | regions' })
  }

  const activeRegionIds = (data ?? []).map((region) => region.id)
  const forecasts = await fetchSitemapForecasts(supabase, activeRegionIds)
  const now = new Date()

  const regionEntries = activeRegionIds.flatMap((regionId) =>
    regionForecastEntries.flatMap(({ changeFrequency, getPath, priority }) =>
      toLocalizedEntries(getPath(regionId), { changeFrequency, lastModified: now, priority }),
    ),
  )

  // "/" only redirects and is never listed; the region chooser only while there is a
  // choice (with one region it redirects to that region's home)
  const chooserEntries: StaticEntry[] =
    activeRegionIds.length > 1
      ? [{ changeFrequency: 'daily', path: routes.regions, priority: 1 }]
      : []

  const staticSitemapEntries = [...chooserEntries, ...staticEntries].flatMap(
    ({ changeFrequency, path, priority }) =>
      toLocalizedEntries(path, { changeFrequency, lastModified: now, priority }),
  )

  // Forecasts keep no edit time, so publication stands in for the last change
  const forecastEntries = forecasts.flatMap(({ id, publishedAt, regionId }) =>
    toLocalizedEntries(routes.forecastsByRegion(regionId).view(id), {
      changeFrequency: 'yearly',
      lastModified: publishedAt ?? undefined,
      priority: 0.5,
    }),
  )

  return [...regionEntries, ...staticSitemapEntries, ...forecastEntries]
}

export default sitemap
