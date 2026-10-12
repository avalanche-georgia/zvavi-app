import { NextResponse } from 'next/server'

import { reportServerError } from '@/lib/posthog/server'

const { TELEGRAM_ADMIN_CHAT_ID, TELEGRAM_BOT_ADMIN_TOKEN } = process.env

type RequestBody = {
  email: string
  name: string
  paymentMethod: string
}

export const POST = async (request: Request) => {
  if (!TELEGRAM_BOT_ADMIN_TOKEN || !TELEGRAM_ADMIN_CHAT_ID) {
    return NextResponse.json({ ok: true, skipped: true })
  }

  const { email, name, paymentMethod } = (await request.json()) as RequestBody

  const isProduction = process.env.VERCEL_ENV === 'production'
  const prefix = isProduction ? '' : '[Test] '

  const text = [
    `<b>${prefix}New Member Application</b>`,
    '',
    `<b>Name:</b> ${name}`,
    `<b>Email:</b> ${email}`,
    `<b>Payment:</b> ${paymentMethod}`,
  ].join('\n')

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_ADMIN_TOKEN}/sendMessage`,
      {
        body: JSON.stringify({ chat_id: TELEGRAM_ADMIN_CHAT_ID, parse_mode: 'HTML', text }),
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
      },
    )

    // The response body is not reported: it can echo the message, which contains the applicant's data
    if (!response.ok) {
      reportServerError(new Error(`Telegram sendMessage failed: ${response.status}`), {
        scope: 'api/notify/new-application',
        status_code: response.status,
      })
    }
  } catch (error) {
    reportServerError(error, { scope: 'api/notify/new-application' })
  }

  return NextResponse.json({ ok: true })
}
