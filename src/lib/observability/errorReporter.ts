import posthog from 'posthog-js'

import { getAdminErrorTracker, isAdminPathname, isAnalyticsEnabled } from '@/lib/posthog'

// Only ids/scopes — never form values, names, emails or other personal data
export type ErrorContext = Record<string, boolean | number | string | null | undefined>

const toError = (error: unknown) => (error instanceof Error ? error : new Error(String(error)))

const getErrorTracker = () => {
  if (isAdminPathname(window.location.pathname)) return getAdminErrorTracker()

  return isAnalyticsEnabled() ? posthog : null
}

// Single entry point for client-side error reporting:
// production → PostHog (admin pages: errors-only instance), elsewhere → console
export const reportError = (error: unknown, context?: ErrorContext) => {
  if (typeof window === 'undefined') return

  if (process.env.NODE_ENV !== 'production') {
    console.error(error, context)

    return
  }

  try {
    getErrorTracker()?.captureException(toError(error), context)
  } catch {
    // Reporting must never break the page
  }
}
