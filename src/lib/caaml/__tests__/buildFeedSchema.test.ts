import { describe, expect, it, vi } from 'vitest'

import { rawFixture } from './fixtures'
import type BuildBulletin from '../buildBulletin'
import buildFeed from '../buildFeed'

// Simulates a builder bug: the bulletin gains a key the schema forbids
vi.mock('../buildBulletin', async (importOriginal) => {
  const { default: buildBulletin } = await importOriginal<{ default: typeof BuildBulletin }>()

  return {
    default: (params: Parameters<typeof buildBulletin>[0]) => ({
      ...buildBulletin(params),
      unexpected: true,
    }),
  }
})

describe('buildFeed schema guard', () => {
  it('omits a bulletin that fails schema validation, never serves it', () => {
    const { forecast, region } = rawFixture('typical')
    const { collection, failures } = buildFeed(
      [{ forecast, forecastId: 412, region, regionId: 'gudauri' }],
      new Date('2026-12-10T15:00:00Z'),
    )

    expect(collection).toBeNull()
    expect(failures).toEqual([
      {
        forecastId: 412,
        reason: expect.stringContaining('additionalProperties'),
        regionId: 'gudauri',
      },
    ])
  })
})
