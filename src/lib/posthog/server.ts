import { after } from 'next/server'
import { PostHog } from 'posthog-node'

import { appRelease, posthogHosts, posthogProjectToken } from './config'
import { getPageContextProperties, sanitizeErrorMessage } from './exceptions'
import { redactUrl } from './redact'

import 'server-only'

// Server events are anonymous: one fixed id, no person profile, no IP/GeoIP,
// and never request headers, cookies or bodies
const serverDistinctId = 'zvavi-server'

export type ServerErrorContext = {
  // Where it happened, e.g. 'api/members/applications' or a table/RPC name
  scope: string
} & Record<string, boolean | number | string | null | undefined>

let client: PostHog | null = null

const getClient = () => {
  if (!posthogProjectToken) return null

  // Serverless functions can freeze right after responding, so events are sent immediately
  client ??= new PostHog(posthogProjectToken, {
    disableGeoip: true,
    flushAt: 1,
    flushInterval: 0,
    host: `https://${posthogHosts.api}`,
  })

  return client
}

// The message (and the stack's first line) can echo a URL with a token
const toSafeError = (error: unknown) => {
  const original = error instanceof Error ? error : new Error(String(error))
  const message = sanitizeErrorMessage(original.message)
  const safeError = new Error(message)

  safeError.name = original.name
  safeError.stack = original.stack?.replace(original.message, message)

  return safeError
}

export const captureServerError = async (
  error: unknown,
  properties: Record<string, boolean | number | string | null | undefined>,
) => {
  const posthog = getClient()

  if (!posthog) {
    console.error(error, properties)

    return
  }

  try {
    await posthog.captureExceptionImmediate(toSafeError(error), serverDistinctId, {
      $process_person_profile: false,
      ...getPageContextProperties(properties.path),
      app_release: appRelease,
      source: 'server',
      ...properties,
      ...(typeof properties.path === 'string' && { path: redactUrl(properties.path) }),
    })
  } catch {
    // Reporting must never break the request
  }
}

// For failures that are caught and turned into a response (so onRequestError never sees them).
// Never use for expected 4xx/validation errors. Sent after the response, so a slow PostHog never
// delays the user.
export const reportServerError = (error: unknown, context: ServerErrorContext) => {
  try {
    after(() => captureServerError(error, context))
  } catch {
    // Outside a request (e.g. build time) after() is unavailable
    void captureServerError(error, context)
  }
}
