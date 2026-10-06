import posthog from 'posthog-js'

import { posthogProjectToken } from './config'

// PostHog's own consent state is the source of truth; no separate storage key
export type AnalyticsConsentStatus = 'denied' | 'granted' | 'pending'

const listeners = new Set<VoidFunction>()

export const isAnalyticsEnabled = () =>
  typeof window !== 'undefined' && Boolean(posthogProjectToken) && posthog.__loaded

// null = analytics not initialised (token unset, server render, or SDK failed to load)
export const getAnalyticsConsent = (): AnalyticsConsentStatus | null => {
  if (!isAnalyticsEnabled()) return null

  try {
    return posthog.get_explicit_consent_status()
  } catch {
    return null
  }
}

export const setAnalyticsConsent = (isGranted: boolean) => {
  if (!isAnalyticsEnabled()) return

  try {
    if (isGranted) {
      posthog.opt_in_capturing()
    } else {
      posthog.opt_out_capturing()
    }
  } catch {
    return
  }

  listeners.forEach((listener) => listener())
}

export const subscribeToAnalyticsConsent = (listener: VoidFunction) => {
  listeners.add(listener)

  return () => {
    listeners.delete(listener)
  }
}
