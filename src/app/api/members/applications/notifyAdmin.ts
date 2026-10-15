import type { MemberApplicationBody } from './schema'

import { reportServerError } from '@/lib/posthog/server'

const { TELEGRAM_ADMIN_CHAT_ID, TELEGRAM_BOT_ADMIN_TOKEN } = process.env

// Telegram's HTML parse mode rejects unescaped <, >, & — and names are free text
const escapeHtml = (value: string): string =>
  value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')

// Sent from the route after the application is saved, so only real applications
// reach the admin chat
const notifyAdmin = async ({
  email,
  firstName,
  lastName,
  paymentMethod,
}: MemberApplicationBody) => {
  if (!TELEGRAM_BOT_ADMIN_TOKEN || !TELEGRAM_ADMIN_CHAT_ID) return

  const prefix = process.env.VERCEL_ENV === 'production' ? '' : '[Test] '

  const text = [
    `<b>${prefix}New Member Application</b>`,
    '',
    `<b>Name:</b> ${escapeHtml(`${firstName} ${lastName}`)}`,
    `<b>Email:</b> ${escapeHtml(email)}`,
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
        scope: 'api/members/applications',
        status_code: response.status,
      })
    }
  } catch (error) {
    reportServerError(error, { scope: 'api/members/applications' })
  }
}

export default notifyAdmin
