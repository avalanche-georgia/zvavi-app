import { LDObserve } from '@launchdarkly/observability'
import { LDRecord } from '@launchdarkly/session-replay'

import { LD_CLIENT_SIDE_ID } from './config'

let replayStarted = false

const serializeValue = (value: unknown): string => {
  if (value === null || value === undefined) {
    return String(value)
  }

  if (typeof value === 'object') {
    try {
      return JSON.stringify(value)
    } catch {
      return '[Circular]'
    }
  }

  return String(value)
}

export const reportError = (error: Error, context?: Record<string, unknown>) => {
  // Skip if not in browser or LaunchDarkly not configured
  if (typeof window === 'undefined' || !LD_CLIENT_SIDE_ID) {
    return
  }

  // Start session replay on first error (error-only replay strategy)
  if (!replayStarted) {
    try {
      LDRecord.start({ forceNew: false, silent: true })
      replayStarted = true
    } catch {
      // Don't set replayStarted to allow retry on next error
    }
  }

  // Report error to LaunchDarkly
  try {
    const payload: Record<string, string> = {}

    if (context) {
      Object.entries(context).forEach(([key, value]) => {
        payload[key] = serializeValue(value)
      })
    }

    LDObserve.recordError(error, error.message, payload)
  } catch {
    // Ignore if reporting fails
  }
}
