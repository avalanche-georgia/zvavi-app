import fetchPublicForecastAvalanches from '@data/queries/fetchPublicForecastAvalanches'
import { NextResponse } from 'next/server'

type RouteContext = { params: Promise<{ id: string }> }

// Public: a published forecast's published linked records (safe columns only)
export const GET = async (_request: Request, { params }: RouteContext) => {
  const forecastId = Number((await params).id)

  if (!Number.isInteger(forecastId) || forecastId <= 0) {
    return NextResponse.json({ error: 'invalid forecast id', ok: false }, { status: 400 })
  }

  try {
    const avalanches = await fetchPublicForecastAvalanches(forecastId)

    return NextResponse.json({ avalanches, ok: true })
  } catch (error) {
    console.error('[GET /api/forecasts/[id]/avalanches] failed:', error)

    return NextResponse.json({ error: 'failed to fetch avalanches', ok: false }, { status: 500 })
  }
}
