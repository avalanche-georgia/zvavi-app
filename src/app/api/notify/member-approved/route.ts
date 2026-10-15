import { getMemberName } from '@components/features/admin/Members/shared/memberName'
import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'

import { buildEmailHtml } from './buildEmailHtml'

import { requireStaff } from '@/lib/auth/requireStaff'
import { reportServerError } from '@/lib/posthog/server'
import { getVerificationUrl } from '@/lib/qrcode'

const scope = 'api/notify/member-approved'

// Only the member id comes from the client: recipient, name and link are read
// from the member record, so the route can't be used to email arbitrary people
const bodySchema = z.object({ memberId: z.uuid() })

const readMemberId = async (request: Request) => {
  try {
    const parsed = bodySchema.safeParse(await request.json())

    return parsed.success ? parsed.data.memberId : null
  } catch {
    return null
  }
}

export const POST = async (request: Request) => {
  const { error: authError, supabase } = await requireStaff()

  if (authError) return authError

  const memberId = await readMemberId(request)

  if (!memberId) {
    return NextResponse.json({ error: 'invalid body', ok: false }, { status: 400 })
  }

  // User-session client: RLS applies
  const { data: member, error: memberError } = await supabase
    .from('members')
    .select('email, first_name, last_name, status, verification_code')
    .eq('id', memberId)
    .maybeSingle()

  if (memberError) {
    reportServerError(memberError, { scope })

    return NextResponse.json({ ok: false }, { status: 500 })
  }

  if (!member) return NextResponse.json({ error: 'not found', ok: false }, { status: 404 })

  if (member.status !== 'active') {
    return NextResponse.json({ error: 'member not active', ok: false }, { status: 409 })
  }

  if (!member.email) return NextResponse.json({ error: 'no email', ok: false }, { status: 422 })

  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ ok: true, skipped: true })
  }

  const resend = new Resend(process.env.RESEND_API_KEY)
  const name = getMemberName({ firstName: member.first_name, lastName: member.last_name })

  try {
    const { error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'Avalanche Georgia <noreply@contact.avalanche.ge>',
      html: buildEmailHtml(name, getVerificationUrl(member.verification_code)),
      subject: 'Your Avalanche Georgia membership has been approved!',
      to: member.email,
    })

    // Resend returns API errors instead of throwing; only its name/status are reported (no email)
    if (error) {
      reportServerError(new Error(`Resend send failed: ${error.name}`), {
        scope,
        status_code: error.statusCode,
      })

      return NextResponse.json({ ok: false }, { status: 502 })
    }
  } catch (error) {
    reportServerError(error, { scope })

    return NextResponse.json({ ok: false }, { status: 502 })
  }

  return NextResponse.json({ ok: true })
}
