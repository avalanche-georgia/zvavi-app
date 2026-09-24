import { NextResponse } from 'next/server'

import fetchPublicObservation from '../fetchPublicObservation'
import { observationQuerySchema } from '../schema'

type RouteContext = { params: Promise<{ id: string }> }

// A single public observation — linked or tapped on the map before its list
// page has loaded
export const GET = async (request: Request, { params }: RouteContext) => {
  const { id } = await params
  const regionId = new URL(request.url).searchParams.get('regionId')
  const parsed = observationQuerySchema.safeParse({ id, regionId })

  if (!parsed.success) {
    return NextResponse.json({ error: 'invalid query', ok: false }, { status: 400 })
  }

  try {
    const observation = await fetchPublicObservation(parsed.data.id, parsed.data.regionId)

    if (!observation) {
      return NextResponse.json({ error: 'not found', ok: false }, { status: 404 })
    }

    return NextResponse.json({ observation, ok: true })
  } catch (error) {
    console.error('[GET /api/observations/[id]] fetchPublicObservation failed:', error)

    return NextResponse.json({ error: 'failed to fetch observation', ok: false }, { status: 500 })
  }
}
