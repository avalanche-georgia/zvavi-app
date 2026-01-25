import { LDObserve } from '@launchdarkly/observability'
import { LDRecord } from '@launchdarkly/session-replay'

let replayStarted = false

export const reportError = (error: Error, context?: Record<string, unknown>) => {
  // Start session replay on first error (error-only replay strategy)
  if (!replayStarted) {
    try {
      LDRecord.start({ forceNew: false, silent: true })
      replayStarted = true
    } catch {
      // Ignore if replay fails to start
    }
  }

  // Report error to LaunchDarkly
  try {
    const payload: Record<string, string> = {}

    if (context) {
      Object.entries(context).forEach(([key, value]) => {
        payload[key] = String(value)
      })
    }

    LDObserve.recordError(error, error.message, payload)
  } catch {
    // Ignore if reporting fails
  }
}
