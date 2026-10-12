import type { PostHog } from 'posthog-js'
import posthog from 'posthog-js'

import { baseClientConfig } from './clientConfig'
import { isAdminPathname, posthogProjectToken } from './config'
import { addPageContext, isNoiseException, sanitizeException } from './exceptions'
import { redactEventUrls } from './redact'

// Team-only, errors-only instance for the admin area. It keeps everything in memory (no cookies,
// localStorage or sessionStorage), sends nothing but $exception events from /admin pages, and never
// touches the visitor consent state of the main instance — so the team is never asked for consent.
const adminInstanceName = 'adminErrors'

let adminInstance: PostHog | null = null

export const initAdminErrorTracking = () => {
  if (adminInstance || !posthogProjectToken || typeof window === 'undefined') return

  adminInstance =
    posthog.init(
      posthogProjectToken,
      {
        ...baseClientConfig,
        before_send: (event) => {
          if (!event || event.event !== '$exception') return null

          const pathname = event.properties.$pathname

          // Autocapture keeps running after client-side navigation to public pages
          if (typeof pathname !== 'string' || !isAdminPathname(pathname)) return null
          if (isNoiseException(event)) return null

          event.properties.$geoip_disable = true

          return addPageContext(sanitizeException(redactEventUrls(event)))
        },
        capture_pageleave: false,
        capture_pageview: false,
        // Own key that is never written, so the visitor's analytics choice doesn't apply here
        consent_persistence_name: 'zv_admin_errors_consent',
        persistence: 'memory',
        // Own storage name, so this instance never reads or clears the main instance's keys
        persistence_name: 'zv_admin_errors',
        person_profiles: 'never',
        save_campaign_params: false,
        save_referrer: false,
      },
      adminInstanceName,
    ) ?? null
}

export const getAdminErrorTracker = () => adminInstance
