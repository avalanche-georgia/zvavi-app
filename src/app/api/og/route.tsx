import type { HazardLevelScale } from '@domain/types'
import { createClient } from '@supabase/supabase-js'
import { format } from 'date-fns'
import { readFileSync } from 'fs'
import { ImageResponse } from 'next/og'
import type { NextRequest } from 'next/server'
import { join } from 'path'

import { hazardColors, hazardIconFiles, hazardLevelLabels, loadFont } from './helpers'

import ForecastCard from './ForecastCard'

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get('id')

  if (!id || isNaN(Number(id))) {
    return new Response('Missing or invalid id', { status: 400 })
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )

  const { data: forecast } = await supabase
    .from('forecasts')
    .select('hazard_levels, valid_until')
    .match({ id: Number(id), status: 'published' })
    .single()

  if (!forecast) {
    return new Response('Forecast not found', { status: 404 })
  }

  const level = forecast.hazard_levels?.overall as HazardLevelScale
  const bgColor = hazardColors[level]
  const levelName = hazardLevelLabels[level]
  const isLight = level !== '5'
  const textColor = isLight ? '#1a1a1a' : '#ffffff'
  const mutedColor = isLight ? '#555555' : '#aaaaaa'
  const validUntil = forecast.valid_until
    ? format(new Date(forecast.valid_until), 'dd MMM yyyy')
    : null

  const logoData = readFileSync(join(process.cwd(), 'public/images/logo.png'))
  const logoBase64 = `data:image/png;base64,${logoData.toString('base64')}`

  const iconFile = hazardIconFiles[level]
  const iconData = readFileSync(join(process.cwd(), `public/og/${iconFile}.svg`))
  const iconBase64 = `data:image/svg+xml;base64,${iconData.toString('base64')}`

  const fontData = await loadFont()

  return new ImageResponse(
    (
      <ForecastCard
        bgColor={bgColor}
        iconBase64={iconBase64}
        levelName={levelName}
        logoBase64={logoBase64}
        mutedColor={mutedColor}
        textColor={textColor}
        validUntil={validUntil}
      />
    ),
    {
      fonts: [{ data: fontData, name: 'Inter', style: 'normal', weight: 600 }],
      headers: { 'Cache-Control': 'public, max-age=86400, immutable' },
      height: 630,
      width: 1200,
    },
  )
}
