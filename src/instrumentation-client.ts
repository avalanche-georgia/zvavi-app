import posthog from 'posthog-js'

import { isAdminPathname, posthogHosts, posthogProjectToken, posthogProxyPath } from '@/lib/posthog'

if (posthogProjectToken) {
  posthog.init(posthogProjectToken, {
    // No feature flags are used — skips the flags request
    advanced_disable_flags: true,
    api_host: posthogProxyPath,
    autocapture: false,
    before_send: (event) => {
      const pathname = event?.properties.$pathname

      if (typeof pathname === 'string' && isAdminPathname(pathname)) return null

      return event
    },
    capture_dead_clicks: false,
    capture_exceptions: false,
    capture_heatmaps: false,
    capture_pageview: 'history_change',
    capture_performance: false,
    // Until the visitor answers, nothing is captured; on rejection, events are sent without cookies
    cookieless_mode: 'on_reject',
    defaults: '2026-05-30',
    disable_conversations: true,
    disable_product_tours: true,
    disable_session_recording: true,
    disable_surveys: true,
    person_profiles: 'identified_only',
    ui_host: posthogHosts.ui,
  })
}
