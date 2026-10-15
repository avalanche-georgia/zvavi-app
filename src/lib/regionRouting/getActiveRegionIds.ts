import { reportServerError } from '@/lib/posthog/server'

// Kept per server instance for as long as fetchActiveRegions caches the list
const cacheTtlMs = 600 * 1000
// After a failure, don't ask again for a while — every entry request would wait on it
const failureTtlMs = 30 * 1000
const requestTimeoutMs = 1500
// During an outage, report at most once a minute per instance
const reportIntervalMs = 60 * 1000

let cache: { expiresAt: number; ids: Set<string> | null } | null = null
let lastReportAt = 0

const reportFailure = (error: unknown) => {
  const now = Date.now()

  if (now - lastReportAt < reportIntervalMs) return

  lastReportAt = now
  reportServerError(error, { scope: 'regionRouting | getActiveRegionIds' })
}

const isRegionRows = (value: unknown): value is { id: string }[] =>
  Array.isArray(value) && value.every((row) => typeof row?.id === 'string')

// The active region ids, read through the anon REST endpoint (the proxy can't use the
// cookie-bound server client). null: the lookup failed.
const getActiveRegionIds = async (): Promise<Set<string> | null> => {
  if (cache && cache.expiresAt > Date.now()) return cache.ids

  try {
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

    const ids = new Set(rows.map(({ id }) => id))

    cache = { expiresAt: Date.now() + cacheTtlMs, ids }

    return ids
  } catch (error) {
    reportFailure(error)
    cache = { expiresAt: Date.now() + failureTtlMs, ids: null }

    return null
  }
}

export default getActiveRegionIds
