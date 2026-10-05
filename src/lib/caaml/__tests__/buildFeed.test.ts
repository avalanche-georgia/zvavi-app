import { describe, expect, it } from 'vitest'

import type { fixtures } from './fixtures'
import { rawFixture } from './fixtures'
import buildFeed from '../buildFeed'

const now = new Date('2026-12-10T15:00:00Z')

const candidateOf = (name: keyof typeof fixtures, regionId = 'gudauri') => {
  const { forecast, region } = rawFixture(name)

  return {
    forecast,
    forecastId: forecast.id as number,
    region: { ...region, id: regionId },
    regionId,
  }
}

describe('buildFeed', () => {
  it('returns an empty, valid collection when no region has a published forecast', () => {
    const { collection, failures } = buildFeed([], now)

    expect(collection?.bulletins).toEqual([])
    expect(collection?.customData).toEqual({ avalancheGeorgia: { apiVersion: 1 } })
    expect(failures).toEqual([])
  })

  it('omits a broken region and keeps the others', () => {
    const broken = candidateOf('edge', 'svaneti')

    broken.forecast.validUntil = null

    const { collection, failures } = buildFeed([candidateOf('typical'), broken], now)

    expect(
      collection?.bulletins.map((bulletin) => bulletin.customData.avalancheGeorgia.forecastId),
    ).toEqual([412])
    expect(failures).toEqual([
      { forecastId: 413, reason: expect.stringContaining('validUntil'), regionId: 'svaneti' },
    ])
  })

  it('returns no collection (→ 5xx) when every region with a forecast fails', () => {
    const broken = candidateOf('typical')

    broken.forecast.hazardLevels.alpine = '9'

    const { collection, failures } = buildFeed([broken], now)

    expect(collection).toBeNull()
    expect(failures).toHaveLength(1)
  })
})
