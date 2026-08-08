import { convertCamelToSnake } from '@data/helpers'
import { NextResponse } from 'next/server'

import { submitObservationSchema } from './schema'

import { createServiceRoleClient } from '@/lib/supabase/serviceRole'

// Hidden via CSS in the real form — a bot fills every field it sees, a human never sees this one.
type HoneypotCheck = { honeypot?: unknown }

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
    p_region_id: body.regionId,
    p_size: body.size ?? undefined,
    p_submitter_contact: body.submitterContact ?? undefined,
    p_submitter_education: body.submitterEducation ?? undefined,
    p_submitter_name: body.submitterName ?? undefined,
    p_trigger: body.trigger ?? undefined,
    p_type: body.type ?? undefined,
  })

  if (error) {
    console.error('[POST /api/observations] submit_observation failed:', error.message)

    return NextResponse.json({ error: 'failed to submit observation', ok: false }, { status: 500 })
  }

  return NextResponse.json({ id: data, ok: true })
}
