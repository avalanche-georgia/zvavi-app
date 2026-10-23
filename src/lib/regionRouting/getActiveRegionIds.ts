import { after } from 'next/server'

import { captureServerError, reportServerError } from '@/lib/posthog/server'

// As long as fetchActiveRegions caches the list for pages, so entry routing agrees with them
const freshTtlMs = 600 * 1000
// After a failure, don't ask again for a while — a request with nothing cached waits on it
const retryAfterFailureMs = 30 * 1000
const requestTimeoutMs = 1500
// One slow lookup is noise (a cold connection); a run of failures is an outage
const failuresBeforeReport = 3
// During an outage, report at most once a minute per instance
const reportIntervalMs = 60 * 1000

let cached: { fetchedAt: number; ids: Set<string> } | null = null
let pending: Promise<Set<string> | null> | null = null
let consecutiveFailures = 0
let lastFailureAt = 0
let lastReportAt = 0

const isRegionRows = (value: unknown): value is { id: string }[] =>
  Array.isArray(value) && value.every((row) => typeof row?.id === 'string')

// Read through the anon REST endpoint: the proxy can't use the cookie-bound server client
const fetchActiveRegionIds = async () => {
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/regions?select=id&is_active=eq.true`,
    {
      headers: { apikey: anonKey, authorization: `Bearer ${anonKey}` },
      signal: AbortSignal.timeout(requestTimeoutMs),
    },
  )

  if (!response.ok) throw new Error(`regions lookup failed: ${response.status}`)

  const rows: unknown = await response.json()

  if (!isRegionRows(rows)) throw new Error('regions lookup: unexpected response')
  // More likely a broken grant or policy than a site with no regions — never kept as good
  if (rows.length === 0) throw new Error('regions lookup: no active regions')

  return new Set(rows.map(({ id }) => id))
}

// Counts the failure; true when it's time to report the run
const recordFailure = () => {
  const now = Date.now()

  consecutiveFailures += 1
  lastFailureAt = now

  if (consecutiveFailures < failuresBeforeReport) return false
  if (now - lastReportAt < reportIntervalMs) return false

  lastReportAt = now

  return true
}

// One lookup at a time per instance; concurrent callers share it
const refresh = (isBackground: boolean) => {
  pending ??= fetchActiveRegionIds()
    .then((ids) => {
      cached = { fetchedAt: Date.now(), ids }
      consecutiveFailures = 0

      return ids
    })
    .catch(async (error: unknown) => {
      if (!recordFailure()) return null

      const context = { consecutiveFailures, scope: 'regionRouting | getActiveRegionIds' }

      // A background refresh outlives its request, where after() can no longer be
      // scheduled; this promise is already held by one, so the report is awaited here
      if (isBackground) await captureServerError(error, context)
      else reportServerError(error, context)

      return null
    })
    .finally(() => {
      pending = null
    })

  return pending
}

// The active region ids. A stale list is served at once and refreshed after the response;
// a failed lookup keeps the last good list. null: nothing is known yet.
// Proxy only: the refresh relies on after() of the current request.
const getActiveRegionIds = async (): Promise<Set<string> | null> => {
  const now = Date.now()

  if (cached && now - cached.fetchedAt < freshTtlMs) return cached.ids
  if (now - lastFailureAt < retryAfterFailureMs) return cached?.ids ?? null
  if (!cached) return refresh(false)

  after(refresh(true))

  return cached.ids
}

export default getActiveRegionIds
