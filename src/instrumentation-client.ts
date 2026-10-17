import posthog from 'posthog-js'

import {
  addPageContext,
  baseClientConfig,
  getDisplayMode,
  isAdminPathname,
  isNoiseException,
  posthogProjectToken,
  redactEventUrls,
  sanitizeException,
  trackPwaInstalled,
} from '@/lib/posthog'

if (posthogProjectToken) {
  posthog.init(posthogProjectToken, {
    ...baseClientConfig,
    before_send: (event) => {
      if (!event) return null

      const pathname = event.properties.$pathname

      // Admin is never tracked here; admin errors go through the errors-only instance
      if (typeof pathname === 'string' && isAdminPathname(pathname)) return null

      if (event.event === '$exception') {
        if (isNoiseException(event)) return null

        sanitizeException(event)
      }

      event.properties.display_mode = getDisplayMode()

      return addPageContext(redactEventUrls(event))
    },
    capture_pageview: 'history_change',
    // Until the visitor answers, nothing is captured; on rejection, events are sent without cookies
    cookieless_mode: 'on_reject',
    person_profiles: 'identified_only',
  })

  window.addEventListener('appinstalled', trackPwaInstalled, { once: true })
}
