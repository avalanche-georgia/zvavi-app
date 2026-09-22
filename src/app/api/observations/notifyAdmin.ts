import type { SubmitObservationBody } from './schema'

const { TELEGRAM_ADMIN_CHAT_ID, TELEGRAM_BOT_ADMIN_TOKEN } = process.env

// Called server-side right after submit_observation succeeds — there's already a
// server hop here (client -> this route -> RPC), so a second client-triggered
// fetch would just be a less reliable way to do the same thing.
const notifyAdmin = async (body: SubmitObservationBody): Promise<void> => {
  if (!TELEGRAM_BOT_ADMIN_TOKEN || !TELEGRAM_ADMIN_CHAT_ID) return

  const isProduction = process.env.VERCEL_ENV === 'production'
  const prefix = isProduction ? '' : '[Test] '

  const text = [
    `<b>${prefix}New Observation</b>`,
    '',
    `<b>Region:</b> ${body.regionId}`,
    `<b>Type:</b> ${body.type ?? 'unknown'}`,
    `<b>Date:</b> ${body.isDateUnknown ? 'unknown' : (body.date ?? 'unknown')}`,
    body.submitterName ? `<b>Submitted by:</b> ${body.submitterName}` : null,
  ]
    .filter(Boolean)
    .join('\n')

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
      const responseBody = await response.text()

      console.error('[notifyAdmin] Telegram send failed:', response.status, responseBody)
    }
  } catch (error) {
    console.error('[notifyAdmin] Telegram send error:', error)
  }
}

export default notifyAdmin
