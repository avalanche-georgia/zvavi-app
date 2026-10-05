import type { Aspect, ElevationZone } from '@domain/types'
import { describe, expect, it } from 'vitest'

import { loadFixture } from './fixtures'
import { buildProblemEntries, groupBands } from '../problems'

const thresholds = { high: 2600, low: 2000 }
const baseProblem = loadFixture('typical').forecast.avalancheProblems[0]

const entriesFor = (aspects: Record<ElevationZone, Aspect[]> | null) =>
  buildProblemEntries({ ...baseProblem, aspects }, thresholds)

describe('groupBands', () => {
  it('merges adjacent bands with identical aspect sets', () => {
    expect(
      groupBands({ alpine: ['e', 'n', 'ne'], highAlpine: ['n', 'ne', 'e'], subAlpine: [] }),
    ).toEqual([{ aspects: ['N', 'NE', 'E'], bands: ['highAlpine', 'alpine'] }])
  })

  it('splits non-adjacent equal sets', () => {
    expect(groupBands({ alpine: [], highAlpine: ['n'], subAlpine: ['n'] })).toEqual([
      { aspects: ['N'], bands: ['highAlpine'] },
      { aspects: ['N'], bands: ['subAlpine'] },
    ])
  })

  it('treats missing bands as empty', () => {
    expect(groupBands({ highAlpine: ['s'] } as Record<ElevationZone, Aspect[]>)).toEqual([
      { aspects: ['S'], bands: ['highAlpine'] },
    ])
  })

  // Exhaustive no-drift check: emitted (band, aspect) pairs == input pairs
  it('never adds or drops a (band, aspect) pair across all 64 combinations', () => {
    const pool: Aspect[][] = [[], ['n'], ['n', 'e'], ['s']]
    let combinations = 0

    for (const highAlpine of pool) {
      for (const alpine of pool) {
        for (const subAlpine of pool) {
          const input = { alpine, highAlpine, subAlpine }
          const expected = Object.entries(input).flatMap(([band, bandAspects]) =>
            bandAspects.map((aspect) => `${band}:${aspect.toUpperCase()}`),
          )
          const emitted = entriesFor(input).flatMap(({ aspects = [], customData }) =>
            customData.avalancheGeorgia.bands.flatMap((band) =>
              aspects.map((aspect) => `${band}:${aspect}`),
            ),
          )

          expect(new Set(emitted)).toEqual(new Set(expected))
          expect(emitted).toHaveLength(expected.length)
          combinations += 1
        }
      }
    }

    expect(combinations).toBe(64)
  })
})

describe('buildProblemEntries', () => {
  it('omits elevation when the group covers all three bands', () => {
    const [entry] = entriesFor({ alpine: ['n'], highAlpine: ['n'], subAlpine: ['n'] })

    expect(entry.aspects).toEqual(['N'])
    expect(entry).not.toHaveProperty('elevation')
  })

  it.each([
    ['all bands empty', { alpine: [], highAlpine: [], subAlpine: [] }],
    ['aspects null', null],
  ])('keeps the problem without aspects or elevation when %s', (_label, aspects) => {
    const entries = entriesFor(aspects)

    expect(entries).toHaveLength(1)
    expect(entries[0]).not.toHaveProperty('aspects')
    expect(entries[0]).not.toHaveProperty('elevation')
    expect(entries[0].customData.avalancheGeorgia.bands).toEqual([])
  })

  it('bounds a sub-alpine-only group from above only', () => {
    const [entry] = entriesFor({ alpine: [], highAlpine: [], subAlpine: ['s'] })

    expect(entry.elevation).toEqual({ upperBound: '2000' })
  })

  it('omits optional fields that are null and never emits a danger rating', () => {
    const [entry] = buildProblemEntries(
      {
        ...baseProblem,
        confidence: null,
        description: '  ',
        distribution: null,
        sensitivity: null,
        trend: null,
      },
      thresholds,
    )

    expect(Object.keys(entry).sort()).toEqual(
      [
        'aspects',
        'avalancheSize',
        'customData',
        'elevation',
        'problemType',
        'validTimePeriod',
      ].sort(),
    )
    expect(Object.keys(entry.customData.avalancheGeorgia).sort()).toEqual([
      'bands',
      'priority',
      'problemType',
    ])
  })
})
