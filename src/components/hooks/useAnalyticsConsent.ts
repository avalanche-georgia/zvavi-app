'use client'

import { useSyncExternalStore } from 'react'

import {
  getAnalyticsConsent,
  setAnalyticsConsent,
  subscribeToAnalyticsConsent,
} from '@/lib/posthog/consent'

const getServerSnapshot = () => null

// status is null when analytics isn't initialised — consent UI must stay hidden then
const useAnalyticsConsent = () => {
  const status = useSyncExternalStore(
    subscribeToAnalyticsConsent,
    getAnalyticsConsent,
    getServerSnapshot,
  )

  return { setConsent: setAnalyticsConsent, status }
}

export default useAnalyticsConsent
