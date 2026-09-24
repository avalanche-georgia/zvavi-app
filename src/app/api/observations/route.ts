import { convertCamelToSnake, roundCoordinate } from '@data/helpers'
import { after, NextResponse } from 'next/server'

import createPhotoVariants from './createPhotoVariants'
import fetchPublicObservations from './fetchPublicObservations'
import notifyAdmin from './notifyAdmin'
import { deletePhotos, promotePhotos, verifyPhotosExist } from './photoKeys'
import {
  photosNotFoundError,
  publicObservationsQuerySchema,
  submitObservationSchema,
} from './schema'

import { createServiceRoleClient } from '@/lib/supabase/serviceRole'

// Hidden via CSS in the real form — a bot fills every field it sees, a human never sees this one.
type HoneypotCheck = { honeypot?: unknown }

export const GET = async (request: Request) => {
  const searchParams = new URL(request.url).searchParams
  const parsed = publicObservationsQuerySchema.safeParse(Object.fromEntries(searchParams))

  if (!parsed.success) {
    return NextResponse.json({ error: 'invalid query', ok: false }, { status: 400 })
  }

  try {
    const observations = await fetchPublicObservations(parsed.data)

    return NextResponse.json({ observations, ok: true })
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

  if (!(await verifyPhotosExist(body.photoKeys))) {
    return NextResponse.json({ error: photosNotFoundError, ok: false }, { status: 400 })
  }

  let photoKeys: string[]

  try {
    photoKeys = await promotePhotos(body.photoKeys)
  } catch (error) {
    console.error('[POST /api/observations] promotePhotos failed:', error)

    return NextResponse.json({ error: 'failed to submit observation', ok: false }, { status: 500 })
  }

  const supabase = createServiceRoleClient()

  const { data, error } = await supabase.rpc('submit_observation', {
    p_aspects: body.aspects ? convertCamelToSnake(body.aspects) : undefined,
    p_date: body.date ?? undefined,
    p_description: body.description ?? undefined,
    p_is_date_unknown: body.isDateUnknown,
    p_latitude: roundCoordinate(body.latitude),
    p_longitude: roundCoordinate(body.longitude),
    p_photo_keys: photoKeys,
    p_quantity: body.quantity,
    p_region_id: body.regionId,
    p_size: body.size ?? undefined,
    p_slab_depth: body.slabDepth ?? undefined,
    p_submitter_contact: body.submitterContact ?? undefined,
    p_submitter_education: body.submitterEducation ?? undefined,
    p_submitter_name: body.submitterName,
    p_trigger: body.trigger,
    p_type: body.type,
    p_width: body.width ?? undefined,
  })

  if (error) {
    console.error('[POST /api/observations] submit_observation failed:', error.message)
    // Pending uploads stay, so the submitter can retry with the same keys
    await deletePhotos(photoKeys)

    return NextResponse.json({ error: 'failed to submit observation', ok: false }, { status: 500 })
  }

  await Promise.all([deletePhotos(body.photoKeys), notifyAdmin(body)])
  // Resized variants are generated after the response is sent, so the submitter
  // doesn't wait for image processing
  after(() => createPhotoVariants(photoKeys))

  return NextResponse.json({ id: data, ok: true })
}
