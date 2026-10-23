import { formatForecastPeriod } from '@components/features/forecast/model/useForecastDates'
import { isNoRowsError } from '@data/helpers'
import { hazardLevelNamesByScale } from '@domain/constants'
import type { HazardLevelScale } from '@domain/types'
import { createClient } from '@supabase/supabase-js'
import { ImageResponse } from 'next/og'
import type { NextRequest } from 'next/server'
import { getTranslations } from 'next-intl/server'

import {
  hazardColors,
  hazardIconFiles,
  imageHeaders,
  imageSize,
  loadFonts,
  loadLogo,
  toDataUri,
  toImageLocale,
} from './helpers'

import ForecastCard from './ForecastCard'

import { reportServerError } from '@/lib/posthog/server'

// A forecast's link preview: /api/og?id=12&locale=ka (&v=… only busts caches)
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const id = Number(searchParams.get('id'))
  const locale = toImageLocale(searchParams.get('locale'))

  if (!id) return new Response('Missing or invalid id', { status: 400 })

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )

  const { data: forecast, error } = await supabase
    .from('forecasts')
    .select('created_at, hazard_levels, published_at, region_id, valid_until')
    .match({ id, status: 'published' })
    .single()

  if (error && !isNoRowsError(error)) {
    reportServerError(new Error(error.message), { scope: 'api/og | forecasts' })
  }

  if (!forecast) return new Response('Forecast not found', { status: 404 })

  const t = await getTranslations({ locale })
  const overall = String(forecast.hazard_levels?.overall)
  const level = (overall in hazardColors ? overall : '0') as HazardLevelScale
  const dates = formatForecastPeriod(
    {
      createdAt: forecast.created_at,
      publishedAt: forecast.published_at,
      validUntil: forecast.valid_until,
    },
    locale,
  )

  return new ImageResponse(
    (
      <ForecastCard
        color={hazardColors[level]}
        dates={dates}
        iconUri={toDataUri(`og/${hazardIconFiles[level]}.svg`, 'image/svg+xml')}
        isDark={level === '5'}
        kicker={t('seo.images.danger')}
        levelName={t(hazardLevelNamesByScale[level])}
        logoUri={loadLogo()}
        regionName={t(`regions.names.${forecast.region_id}`)}
      />
    ),
    { ...imageSize, fonts: loadFonts(), headers: imageHeaders },
  )
}
