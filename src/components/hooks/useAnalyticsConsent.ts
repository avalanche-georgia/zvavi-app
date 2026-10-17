'use client'

import { useSyncExternalStore } from 'react'

import {
  getAnalyticsConsent,
  setAnalyticsConsent,
  shouldAskForAnalyticsConsent,
  subscribeToAnalyticsConsent,
} from '@/lib/posthog/consent'

const getServerSnapshot = () => null

const getShouldAskServerSnapshot = () => false

// status is null when analytics isn't initialised — consent UI must stay hidden then
const useAnalyticsConsent = () => {
  const status = useSyncExternalStore(
    subscribeToAnalyticsConsent,
    getAnalyticsConsent,
    getServerSnapshot,
  )
  // Separate snapshot: declining again leaves status 'denied' but must still hide the card
  const shouldAsk = useSyncExternalStore(
    subscribeToAnalyticsConsent,
    shouldAskForAnalyticsConsent,
    getShouldAskServerSnapshot,
  )

  return { setConsent: setAnalyticsConsent, shouldAsk, status }
}

export default useAnalyticsConsent
