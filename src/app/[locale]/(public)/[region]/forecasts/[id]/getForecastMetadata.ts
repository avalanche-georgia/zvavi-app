import { formatForecastPeriod } from '@components/features/forecast/model/useForecastDates'
import { isNoRowsError } from '@data/helpers'
import { hazardLevelNames, hazardLevelNamesByScale } from '@domain/constants'
import type { HazardLevelScale } from '@domain/types'
import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { getTranslations } from 'next-intl/server'

import { reportServerError } from '@/lib/posthog/server'
import getPageMetadata from '@/lib/seo/getPageMetadata'
import getSummaryHeadline from '@/lib/seo/getSummaryHeadline'
import { createClient } from '@/lib/supabase/server'
import { routes } from '@/routes'

// The language forecasters write the summary in
const summaryLocale = 'en'

type ForecastParams = { id: string; locale: string }

// Title, description and the per-forecast preview image of a forecast's page
const getForecastMetadata = async (params: ForecastParams): Promise<Metadata> => {
  const forecastId = Number(params.id)

  if (isNaN(forecastId)) return {}

  const requestHeaders = await headers()
  const host = requestHeaders.get('host') ?? 'avalanche.ge'
  const origin = `https://${host}`

  const supabase = await createClient()
  const { data, error } = await supabase
    .from('forecasts')
    .select('created_at, hazard_levels, published_at, region_id, summary, valid_until')
    .match({ id: forecastId, status: 'published' })
    .single()

  if (error && !isNoRowsError(error)) {
    reportServerError(new Error(error.message), {
      forecast_id: forecastId,
      scope: 'forecast page | generateMetadata',
    })
  }

  if (!data) return {}

  const { locale } = params
  const t = await getTranslations()
  // TODO: type-safe DB conversion — https://app.asana.com/1/1208747886147296/project/1208747689500826/task/1214630622531225
  const level = String((data.hazard_levels as Record<string, string> | null)?.overall ?? '0')
  const levelKey = hazardLevelNamesByScale[level as HazardLevelScale] ?? hazardLevelNames.noRating
  const regionName = t(`regions.names.${data.region_id}`)
  const dates = formatForecastPeriod(
    { createdAt: data.created_at, publishedAt: data.published_at, validUntil: data.valid_until },
    locale,
  )
  // Forecasters write the summary in English only (for now), so Georgian pages describe the
  // forecast from a template
  const headline = locale === summaryLocale ? getSummaryHeadline(data.summary) : null
  const description =
    headline ??
    (level === '0'
      ? t('seo.forecast.descriptionNoRating')
      : t('seo.forecast.description', { levelName: t(levelKey) }))
  // The image is cached for good, so its URL changes with what it shows: an edited forecast
  // gets a fresh one
  const imageVersion = [level, data.published_at, data.valid_until]
    .map((value) => (value && Date.parse(value) ? Date.parse(value).toString(36) : value))
    .join('-')

  return getPageMetadata({
    description,
    image: `${origin}/api/og?id=${forecastId}&locale=${locale}&v=${imageVersion}`,
    locale,
    // The forecast's own region: a mismatched URL still renders it, but must not compete
    // with the real one
    path: routes.forecastsByRegion(data.region_id).view(forecastId),
    title: [t('seo.forecast.title', { regionName }), dates].filter(Boolean).join(' · '),
  })
}

export default getForecastMetadata
