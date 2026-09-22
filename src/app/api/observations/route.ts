import { convertCamelToSnake } from '@data/helpers'
import type { RegionId } from '@domain/types'
import { NextResponse } from 'next/server'

import fetchPublicObservations from './fetchPublicObservations'
import notifyAdmin from './notifyAdmin'
import { submitObservationSchema } from './schema'

import { createServiceRoleClient } from '@/lib/supabase/serviceRole'
import { Constants } from '@/lib/supabase/types'

// Hidden via CSS in the real form — a bot fills every field it sees, a human never sees this one.
type HoneypotCheck = { honeypot?: unknown }

const validRegionIds: readonly string[] = Constants.public.Enums.region_id

export const GET = async (request: Request) => {
  const searchParams = new URL(request.url).searchParams
  const regionId = searchParams.get('regionId')

  if (!regionId || !validRegionIds.includes(regionId)) {
    return NextResponse.json({ error: 'a valid regionId is required', ok: false }, { status: 400 })
  }

  try {
    const observations = await fetchPublicObservations({
      dateFrom: searchParams.get('dateFrom') ?? undefined,
      dateTo: searchParams.get('dateTo') ?? undefined,
      regionId: regionId as RegionId,
    })

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
  const supabase = createServiceRoleClient()

  const { data, error } = await supabase.rpc('submit_observation', {
    p_aspects: body.aspects ? convertCamelToSnake(body.aspects) : undefined,
    p_date: body.date ?? undefined,
    p_description: body.description ?? undefined,
    p_is_date_unknown: body.isDateUnknown,
    p_latitude: body.latitude ?? undefined,
    p_longitude: body.longitude ?? undefined,
    // @ts-expect-error p_quantity added by 20260808102960_submit_observation_add_quantity.sql,
    // not yet applied to staging — remove this once `pnpm typegen` picks it up.
    p_quantity: body.quantity,
    p_region_id: body.regionId,
    p_size: body.size ?? undefined,
    p_submitter_contact: body.submitterContact ?? undefined,
    p_submitter_education: body.submitterEducation ?? undefined,
    p_submitter_name: body.submitterName,
    p_trigger: body.trigger,
    p_type: body.type,
  })

  if (error) {
    console.error('[POST /api/observations] submit_observation failed:', error.message)

    return NextResponse.json({ error: 'failed to submit observation', ok: false }, { status: 500 })
  }

  await notifyAdmin(body)

  return NextResponse.json({ id: data, ok: true })
}
