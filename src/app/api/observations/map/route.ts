import { NextResponse } from 'next/server'

import fetchObservationPoints from '../fetchObservationPoints'
import { observationFiltersSchema } from '../schema'

// Map markers for every observation matching the filter (the list is paged)
export const GET = async (request: Request) => {
  const searchParams = new URL(request.url).searchParams
  const parsed = observationFiltersSchema.safeParse(Object.fromEntries(searchParams))

  if (!parsed.success) {
    return NextResponse.json({ error: 'invalid query', ok: false }, { status: 400 })
  }

  try {
    const points = await fetchObservationPoints(parsed.data)

    return NextResponse.json({ ...points, ok: true })
  } catch (error) {
    console.error('[GET /api/observations/map] fetchObservationPoints failed:', error)

    return NextResponse.json({ error: 'failed to fetch observations', ok: false }, { status: 500 })
  }
}
