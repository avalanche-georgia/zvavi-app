export type DisplayMode = 'browser' | 'pwa'

// Read on every event (never cached), so a session opened from the home-screen app is told apart
// from one in a regular tab. navigator.standalone is iOS Safari's non-standard flag.
export const getDisplayMode = (): DisplayMode => {
  if (typeof window === 'undefined') return 'browser'

  const isStandalone =
    window.matchMedia?.('(display-mode: standalone)').matches ||
    ('standalone' in window.navigator && window.navigator.standalone === true)

  return isStandalone ? 'pwa' : 'browser'
}
