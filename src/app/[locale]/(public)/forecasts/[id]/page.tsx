import { ForecastContainer } from '@components/features/forecast'
import { PageWrapper } from '@components/layout'
import type { HazardLevelScale } from '@domain/types'
import { format } from 'date-fns'
import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { notFound } from 'next/navigation'

import { fetchForecastPageData } from './fetchForecastPageData'

import { createClient } from '@/lib/supabase/server'

const hazardLevelLabels: Record<HazardLevelScale, string> = {
  0: 'No Rating',
  1: 'Low',
  2: 'Moderate',
  3: 'Considerable',
  4: 'High',
  5: 'Extreme',
}

type Props = { params: Promise<{ id: string }> }

export const generateMetadata = async (props: Props): Promise<Metadata> => {
  const params = await props.params
  const forecastId = Number(params.id)

  if (isNaN(forecastId)) return {}

  const requestHeaders = await headers()
  const host = requestHeaders.get('host') ?? 'avalanche.ge'
  const origin = `https://${host}`

  const supabase = await createClient()
  const { data } = await supabase
    .from('forecasts')
    .select('hazard_levels, valid_until')
    .match({ id: forecastId, status: 'published' })
    .single()

  if (!data) return {}

  const level = (data.hazard_levels?.overall ?? 0) as HazardLevelScale
  const levelName = hazardLevelLabels[level]
  const validUntil = data.valid_until ? format(new Date(data.valid_until), 'dd MMM yyyy') : null
  const title = `${levelName} Avalanche Hazard${validUntil ? ` · Valid until ${validUntil}` : ''}`
  const description = `Avalanche forecast for Georgia. Overall hazard level: ${levelName}.${validUntil ? ` Valid until ${validUntil}.` : ''}`

  return {
    description,
    openGraph: {
      description,
      images: [`${origin}/api/og?id=${forecastId}`],
      title,
    },
    title,
  }
}

const ForecastPage = async (props: Props) => {
  const params = await props.params
  const forecastId = Number(params.id)

  if (Number.isNaN(forecastId)) {
    notFound()
  }

  const data = await fetchForecastPageData(forecastId)

  if (!data) {
    notFound()
  }

  const { initialForecast, isCurrentForecast } = data

  return (
    <PageWrapper>
      <ForecastContainer initialForecast={initialForecast} isCurrentForecast={isCurrentForecast} />
    </PageWrapper>
  )
}

export default ForecastPage
