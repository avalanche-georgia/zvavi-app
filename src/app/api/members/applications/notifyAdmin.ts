import type { MemberApplicationBody } from './schema'

import { reportServerError } from '@/lib/posthog/server'

const { TELEGRAM_ADMIN_CHAT_ID, TELEGRAM_BOT_ADMIN_TOKEN } = process.env

// Telegram's HTML parse mode rejects unescaped <, >, & — and names are free text
const escapeHtml = (value: string): string =>
  value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')

// Internal admin chat, always English
const paymentLabels: Record<MemberApplicationBody['paymentMethod'], string> = {
  bank_foreign: 'Bank transfer (USD/EUR)',
  bank_gel: 'Bank transfer (GEL)',
  contact_me: 'Asked to be contacted',
  wise: 'Wise',
}

// Sent from the route after the application is saved, so only real applications
// reach the admin chat. `reviewUrl` opens the member in admin, ready to approve.
const notifyAdmin = async (
  { email, firstName, lastName, paymentMethod }: MemberApplicationBody,
  reviewUrl: string,
) => {
  if (!TELEGRAM_BOT_ADMIN_TOKEN || !TELEGRAM_ADMIN_CHAT_ID) return

  const isProduction = process.env.VERCEL_ENV === 'production'
  const prefix = isProduction ? '' : '[Test] '

  const text = [
    `<b>${prefix}New Member Application</b>`,
    '',
    `<b>Name:</b> ${escapeHtml(`${firstName} ${lastName}`)}`,
    `<b>Email:</b> ${escapeHtml(email)}`,
    `<b>Payment:</b> ${paymentLabels[paymentMethod]}`,
    '',
    `<a href="${escapeHtml(reviewUrl)}">Review and approve</a>`,
    // Telegram drops links without a public domain (localhost) — show the URL
    // itself outside production so it can still be copied
    ...(isProduction ? [] : [`<code>${escapeHtml(reviewUrl)}</code>`]),
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
