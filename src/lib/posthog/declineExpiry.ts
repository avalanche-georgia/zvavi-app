import { isBefore, subMonths } from 'date-fns'

// A "No thanks" is remembered as long as regulators expect (CNIL: about 6 months), then the visitor
// is asked again; each new decline restarts the period. PostHog stores the choice itself but not when it was made.
const declinedAtKey = 'zv_analytics_declined_at'
const declineDurationMonths = 6

const getDeclinedAt = () => {
  try {
    const declinedAt = Number(localStorage.getItem(declinedAtKey))

    return declinedAt > 0 ? declinedAt : null
  } catch {
    return null
  }
}

export const recordConsentChoice = (isGranted: boolean) => {
  try {
    if (isGranted) {
      localStorage.removeItem(declinedAtKey)
    } else {
      localStorage.setItem(declinedAtKey, String(Date.now()))
    }
  } catch {
    // Storage can be blocked; the decline then simply never expires
  }
}

// Visitors whose browser already says "don't track" aren't asked again
const hasPrivacySignal = () =>
  typeof navigator === 'undefined' ||
  navigator.doNotTrack === '1' ||
  ('globalPrivacyControl' in navigator && navigator.globalPrivacyControl === true)

// Declines made before the date was stored (or with storage blocked) never expire
export const isDeclineExpired = () => {
  if (hasPrivacySignal()) return false

  const declinedAt = getDeclinedAt()

  return declinedAt !== null && isBefore(declinedAt, subMonths(new Date(), declineDurationMonths))
}
