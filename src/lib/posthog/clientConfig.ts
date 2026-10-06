import type { PostHogConfig } from 'posthog-js'

import { posthogHosts, posthogProxyPath } from './config'

// Options shared by the main (visitor) instance and the admin errors-only instance
export const baseClientConfig: Partial<PostHogConfig> = {
  // No feature flags are used — skips the flags request
  advanced_disable_flags: true,
  api_host: posthogProxyPath,
  autocapture: false,
  capture_dead_clicks: false,
  // Unhandled errors and promise rejections; console.error capture is too noisy
  capture_exceptions: {
    capture_console_errors: false,
    capture_unhandled_errors: true,
    capture_unhandled_rejections: true,
  },
  capture_heatmaps: false,
  capture_performance: false,
  defaults: '2026-05-30',
  disable_conversations: true,
  disable_product_tours: true,
  disable_session_recording: true,
  disable_surveys: true,
  ui_host: posthogHosts.ui,
}
