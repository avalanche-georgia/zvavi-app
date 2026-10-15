import { NextResponse } from 'next/server'

import notifyAdmin from './notifyAdmin'
import { memberApplicationBodySchema } from './schema'

import { reportServerError } from '@/lib/posthog/server'
import { createServiceRoleClient } from '@/lib/supabase/serviceRole'

type HoneypotCheck = { honeypot?: unknown }

type SubmitResult = { memberId: string; verificationCode: string }

// Public membership application: validated here, written by the
// submit_member_application RPC, which only the service role may execute
export const POST = async (request: Request) => {
  let rawBody: unknown

  try {
    rawBody = await request.json()
  } catch {
    return NextResponse.json({ error: 'invalid JSON body', ok: false }, { status: 400 })
  }

  // Before validation: a bot gets the same silent success whatever else it filled in
  if (typeof rawBody === 'object' && rawBody !== null && (rawBody as HoneypotCheck).honeypot) {
    return NextResponse.json({ ok: true })
  }

  const parsed = memberApplicationBodySchema.safeParse(rawBody)

  if (!parsed.success) {
    return NextResponse.json({ error: 'invalid application', ok: false }, { status: 400 })
  }

  const body = parsed.data
  const { data, error } = await createServiceRoleClient().rpc('submit_member_application', {
    p_address: body.address || undefined,
    p_age: body.age ?? undefined,
    p_email: body.email,
    p_first_name: body.firstName,
    p_gender: body.gender || undefined,
    p_last_name: body.lastName,
    p_motivation: body.motivation || undefined,
    p_occupation: body.occupation || undefined,
    p_payment_method: body.paymentMethod,
    p_phone: body.phone,
  })

  if (error) {
    // Code only: the message can quote the applicant's data (e.g. a duplicate email)
    reportServerError(new Error(`submit_member_application failed: ${error.code}`), {
      scope: 'api/members/applications',
    })

    return NextResponse.json({ error: 'failed to submit application', ok: false }, { status: 500 })
  }

  await notifyAdmin(body)

  return NextResponse.json({ ...(data as SubmitResult), ok: true })
}
