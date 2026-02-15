import { NextResponse } from 'next/server'

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

    if (!response.ok) {
      const body = await response.text()

      console.error('[Telegram notify] Failed:', response.status, body)
    }
  } catch (error) {
    console.error('[Telegram notify] Error:', error)
  }

  return NextResponse.json({ ok: true })
}
