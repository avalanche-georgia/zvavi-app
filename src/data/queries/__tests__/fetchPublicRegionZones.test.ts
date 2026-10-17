import { beforeEach, describe, expect, it, vi } from 'vitest'

import fetchPublicRegionZones from '../fetchPublicRegionZones'

type QueryResult = { data: unknown; error: { message: string } | null }

let result: QueryResult = { data: [], error: null }
const selected: string[] = []

// Chainable fake of the supabase-js query builder
const query: Record<string, unknown> = {
  eq: () => query,
  not: () => query,
  order: () => query,
  select: (columns: string) => {
    selected.push(columns)

    return query
  },
  then: (resolve: (value: QueryResult) => void) => resolve(result),
}

vi.mock('@/lib/supabase/anonymous', () => ({
  createAnonymousClient: () => ({ from: () => query }),
}))

const zone = { features: [], type: 'FeatureCollection' }

describe('fetchPublicRegionZones', () => {
  beforeEach(() => {
    selected.length = 0
  })

  it('selects explicit columns and passes the zone through untouched', async () => {
    result = {
      data: [{ caaml_region_id: 'GE-MM-01', forecast_zone: zone, id: 'gudauri', name_en: 'G B' }],
      error: null,
    }

    expect(await fetchPublicRegionZones()).toEqual([
      { caamlRegionId: 'GE-MM-01', forecastZone: zone, id: 'gudauri', nameEn: 'G B' },
    ])
    expect(selected).toEqual(['id, caaml_region_id, name_en, forecast_zone'])
  })

  it('fails instead of serving an empty collection when no region is readable', async () => {
    result = { data: [], error: null }

    await expect(fetchPublicRegionZones()).rejects.toThrow('no active region')
  })

  it('throws on a data error', async () => {
    result = { data: null, error: { message: 'boom' } }

    await expect(fetchPublicRegionZones()).rejects.toThrow('boom')
  })
})
