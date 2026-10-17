import { beforeEach, describe, expect, it, vi } from 'vitest'

import fetchPublicBulletinSources from '../fetchPublicBulletinSources'

type Call = { args: unknown[]; method: string; table: string }
type TableResult = { data: unknown; error: { message: string } | null }

const calls: Call[] = []
let results: Record<string, TableResult> = {}

// Chainable fake of the supabase-js query builder that records every call
const queryFor = (table: string) => {
  const query: Record<string, unknown> = {}

  for (const method of ['select', 'eq', 'not', 'order', 'limit']) {
    query[method] = (...args: unknown[]) => {
      calls.push({ args, method, table })

      return query
    }
  }

  query.then = (resolve: (value: TableResult) => void) => resolve(results[table])

  return query
}

vi.mock('@/lib/supabase/anonymous', () => ({
  createAnonymousClient: () => ({ from: queryFor }),
}))

const callsOf = (table: string, method: string) =>
  calls.filter((call) => call.table === table && call.method === method).map((call) => call.args)

describe('fetchPublicBulletinSources', () => {
  beforeEach(() => {
    calls.length = 0
    results = {
      forecasts: { data: [{ avalanche_problems: [], hazard_levels: {}, id: 7 }], error: null },
      regions: { data: [{ id: 'gudauri' }], error: null },
    }
  })

  it('selects explicit columns only, never forecaster, and filters published explicitly', async () => {
    await fetchPublicBulletinSources()

    const selected = calls
      .filter((call) => call.method === 'select')
      .map((call) => String(call.args[0]))

    expect(selected).toHaveLength(2)
    selected.forEach((columns) => {
      expect(columns).not.toMatch(/\*|forecaster|created_by|email/)
    })
    expect(callsOf('forecasts', 'eq')).toContainEqual(['status', 'published'])
    expect(callsOf('forecasts', 'order')[0]).toEqual(['created_at', { ascending: false }])
    // Only the newest published forecast: an invalid one is never replaced by an older one
    expect(callsOf('forecasts', 'limit')).toEqual([[1]])
    expect(callsOf('regions', 'eq')).toContainEqual(['is_active', true])
    expect(callsOf('regions', 'not')).toContainEqual(['caaml_region_id', 'is', null])
    // Problems are embedded: one statement, one consistent snapshot
    expect(selected[1]).toMatch(/avalanche_problems\(order, type/)
    expect(callsOf('forecasts', 'order')).toContainEqual([
      'order',
      { referencedTable: 'avalanche_problems' },
    ])
    expect(calls.some((call) => call.table === 'avalanche_problems')).toBe(false)
  })

  it('hands the embedded problems to the candidate, not as a forecast column', async () => {
    results.forecasts = {
      data: [{ avalanche_problems: [{ order: 0, type: 'windSlab' }], hazard_levels: {}, id: 7 }],
      error: null,
    }

    const [candidate] = await fetchPublicBulletinSources()

    expect(candidate.forecast).toMatchObject({
      avalancheProblems: [{ order: 0, type: 'windSlab' }],
    })
  })

  it('fails instead of serving an empty feed when no region is readable', async () => {
    results.regions = { data: [], error: null }

    await expect(fetchPublicBulletinSources()).rejects.toThrow('no active region')
  })

  it('leaves out regions without a published forecast', async () => {
    results.forecasts = { data: [], error: null }

    expect(await fetchPublicBulletinSources()).toEqual([])
  })

  it('throws on a data error', async () => {
    results.forecasts = { data: null, error: { message: 'boom' } }

    await expect(fetchPublicBulletinSources()).rejects.toThrow('boom')
  })
})
