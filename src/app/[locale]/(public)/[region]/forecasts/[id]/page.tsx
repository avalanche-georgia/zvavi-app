import { ForecastContainer } from '@components/features/forecast'
import { isNoRowsError } from '@data/helpers'
import { fetchForecastPageData } from '@data/queries/fetchForecastPageData'
import type { HazardLevelScale } from '@domain/types'
import { format } from 'date-fns'
import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { notFound } from 'next/navigation'

import { reportServerError } from '@/lib/posthog/server'
import getAlternates from '@/lib/seo/getAlternates'
import { createClient } from '@/lib/supabase/server'
import { routes } from '@/routes'

const hazardLevelLabels: Record<HazardLevelScale, string> = {
  0: 'No Rating',
  1: 'Low',
  2: 'Moderate',
  3: 'Considerable',
  4: 'High',
  5: 'Extreme',
}

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
    .select('hazard_levels, valid_until')
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
  const levelName = hazardLevelLabels[level]
  const validUntil = data.valid_until ? format(new Date(data.valid_until), 'dd MMM yyyy') : null
  const title = `${levelName} Avalanche Hazard${validUntil ? ` · Valid until ${validUntil}` : ''}`
  const description = `Avalanche forecast for Georgia. Overall hazard level: ${levelName}.${validUntil ? ` Valid until ${validUntil}.` : ''}`

  return {
    alternates: getAlternates(
      params.locale,
      routes.forecastsByRegion(params.region).view(forecastId),
    ),
    description,
    openGraph: {
      description,
      images: [`${origin}/api/og?id=${forecastId}`],
      title,
    },
    title,
  }
}

const ForecastPage = async (props: ForecastPageProps) => {
  const params = await props.params
  const forecastId = Number(params.id)

  if (Number.isNaN(forecastId)) {
    notFound()
  }

  const data = await fetchForecastPageData(forecastId)

  if (!data) {
    notFound()
  }

  return (
    <ForecastContainer
      initialForecast={data.initialForecast}
      isCurrentForecast={data.isCurrentForecast}
      nextForecastId={data.nextForecastId}
      previousForecastId={data.previousForecastId}
    />
  )
}

export default ForecastPage
