import { ForecastPage, LiveForecast } from '@components/features/forecast'
import { isNoRowsError } from '@data/helpers'
import { fetchForecastPageData } from '@data/queries/fetchForecastPageData'
import { hazardLevelNames, hazardLevelNamesByScale } from '@domain/constants'
import type { HazardLevelScale } from '@domain/types'
import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'

import fetchForecastSponsors from './fetchForecastSponsors'

import { reportServerError } from '@/lib/posthog/server'
import getPageMetadata from '@/lib/seo/getPageMetadata'
import { createClient } from '@/lib/supabase/server'
import { formatTbilisi } from '@/lib/tbilisiTime'
import { routes } from '@/routes'

type ForecastPageProps = { params: Promise<{ id: string; locale: string; region: string }> }

export const generateMetadata = async (props: ForecastPageProps): Promise<Metadata> => {
  const params = await props.params
  const forecastId = Number(params.id)

  if (isNaN(forecastId)) return {}

  const requestHeaders = await headers()
  const host = requestHeaders.get('host') ?? 'avalanche.ge'
  const origin = `https://${host}`

  const supabase = await createClient()
  const { data, error } = await supabase
    .from('forecasts')
    .select('hazard_levels, region_id, valid_until')
    .match({ id: forecastId, status: 'published' })
    .single()

  if (error && !isNoRowsError(error)) {
    reportServerError(new Error(error.message), {
      forecast_id: forecastId,
      scope: 'forecast page | generateMetadata',
    })
  }

  if (!data) return {}

  // TODO: type-safe DB conversion — https://app.asana.com/1/1208747886147296/project/1208747689500826/task/1214630622531225
  const level = ((data.hazard_levels as Record<string, string> | null)?.overall ??
    0) as HazardLevelScale
  const regionId = data.region_id ?? params.region
  const t = await getTranslations()
  const messageValues = {
    levelName: t(hazardLevelNamesByScale[level] ?? hazardLevelNames.noRating),
    regionName: t(`regions.names.${regionId}`),
    validUntil: data.valid_until ? formatTbilisi(data.valid_until, 'dd.MM.yyyy') : '',
  }
  const messageKey = data.valid_until ? 'seo.forecast' : 'seo.forecastUndated'
  // The image is cached for good, so its URL changes with what it shows: an edited
  // forecast gets a fresh one
  const imageVersion = `${level}-${data.valid_until ?? ''}`

  return getPageMetadata({
    description: t(`${messageKey}.description`, messageValues),
    image: `${origin}/api/og?id=${forecastId}&v=${encodeURIComponent(imageVersion)}`,
    locale: params.locale,
    // The forecast's own region: a mismatched URL still renders it, but must not compete
    // with the real one
    path: routes.forecastsByRegion(regionId).view(forecastId),
    title: t(`${messageKey}.title`, messageValues),
  })
}

// A forecast by id. A past one doesn't change, so it renders straight from the server
// (no supabase-js in the browser). The current one — reached by "next" from yesterday's,
// or the admin's public link — stays live like the current forecast page.
const ForecastByIdPage = async (props: ForecastPageProps) => {
  const params = await props.params
  const forecastId = Number(params.id)

  if (Number.isNaN(forecastId)) {
    notFound()
  }

  const [data, partners] = await Promise.all([
    fetchForecastPageData(forecastId),
    fetchForecastSponsors(),
  ])

  if (!data) {
    notFound()
  }

  if (data.isCurrentForecast) {
    return (
      <LiveForecast
        forecasterProfile={data.forecasterProfile}
        initialForecast={data.initialForecast}
        initialPartners={partners}
        isCurrentForecast
        nextForecastId={data.nextForecastId}
        previousForecastId={data.previousForecastId}
      />
    )
  }

  return (
    <ForecastPage
      forecast={data.initialForecast}
      forecasterProfile={data.forecasterProfile}
      isCurrentForecast={data.isCurrentForecast}
      nextForecastId={data.nextForecastId}
      partners={partners}
      previousForecastId={data.previousForecastId}
    />
  )
}

export default ForecastByIdPage
