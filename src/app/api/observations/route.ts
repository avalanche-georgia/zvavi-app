import { convertCamelToSnake, roundCoordinate } from '@data/helpers'
import { NextResponse } from 'next/server'

import fetchPublicObservations from './fetchPublicObservations'
import notifyAdmin from './notifyAdmin'
import { observationsPageQuerySchema, submitObservationSchema } from './schema'
import writeWithPhotos from './writeWithPhotos'

import { createServiceRoleClient } from '@/lib/supabase/serviceRole'
import { routes } from '@/routes'

// Hidden via CSS in the real form — a bot fills every field it sees, a human never sees this one.
type HoneypotCheck = { honeypot?: unknown }

export const GET = async (request: Request) => {
  const searchParams = new URL(request.url).searchParams
  const parsed = observationsPageQuerySchema.safeParse(Object.fromEntries(searchParams))

  if (!parsed.success) {
    return NextResponse.json({ error: 'invalid query', ok: false }, { status: 400 })
  }

  try {
    const page = await fetchPublicObservations(parsed.data)

    return NextResponse.json({ ...page, ok: true })
  } catch (error) {
    console.error('[GET /api/observations] fetchPublicObservations failed:', error)

    return NextResponse.json({ error: 'failed to fetch observations', ok: false }, { status: 500 })
  }
}

export const POST = async (request: Request) => {
  let rawBody: unknown

  try {
    rawBody = await request.json()
  } catch {
    return NextResponse.json({ error: 'invalid JSON body', ok: false }, { status: 400 })
  }

  // Checked before schema validation — a bot that fills every field (including junk in
  // enum-typed ones) must still get a silent { ok: true }, not a validation error that
  // would tip it off that this endpoint distinguishes bots from humans.
  if (typeof rawBody === 'object' && rawBody !== null && (rawBody as HoneypotCheck).honeypot) {
    return NextResponse.json({ ok: true })
  }

  const parsed = submitObservationSchema.safeParse(rawBody)

  if (!parsed.success) {
    return NextResponse.json({ error: 'invalid submission', ok: false }, { status: 400 })
  }

  const body = parsed.data
  const supabase = createServiceRoleClient()

  const result = await writeWithPhotos({
    failureMessage: 'failed to submit observation',
    logLabel: 'POST /api/observations',
    pendingKeys: body.photoKeys,
    write: (photoKeys) =>
      supabase.rpc('submit_observation', {
        p_aspects: body.aspects ? convertCamelToSnake(body.aspects) : undefined,
        // "Unknown" wins over a date picked before the box was ticked
        p_date: body.isDateUnknown ? undefined : (body.date ?? undefined),
        p_description: body.description ?? undefined,
        p_is_date_unknown: body.isDateUnknown,
        p_latitude: roundCoordinate(body.latitude),
        p_longitude: roundCoordinate(body.longitude),
        p_photo_keys: photoKeys,
        p_quantity: body.quantity,
        p_region_id: body.regionId,
        p_size: body.size,
        p_slab_depth: body.slabDepth ?? undefined,
        p_submitter_contact: body.submitterContact ?? undefined,
        p_submitter_education: body.submitterEducation ?? undefined,
        p_submitter_name: body.submitterName,
        p_trigger: body.trigger,
        p_type: body.type,
        p_width: body.width ?? undefined,
      }),
  })

  if (!result.ok) return result.response

  const id = result.written.data

  // Same origin as this request, so staging links to staging
  const reviewUrl = new URL(routes.admin.recentAvalanches.view(id), request.url).toString()

  await notifyAdmin(body, reviewUrl)

  return NextResponse.json({ id, ok: true })
}
