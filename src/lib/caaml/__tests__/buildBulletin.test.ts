import { v5 as uuidV5, validate as isUuid } from 'uuid'
import { describe, expect, it } from 'vitest'

import { loadFixture, rawFixture } from './fixtures'
import buildBulletin from '../buildBulletin'
import bulletinId from '../bulletinId'
import { InvalidForecastError } from '../errors'
import { parseBulletinSource } from '../input'

type RawFixture = ReturnType<typeof rawFixture>

const buildFromRaw = (raw: RawFixture) =>
  buildBulletin({ ...parseBulletinSource(raw), now: new Date(raw.now) })

const mutated = (mutate: (raw: RawFixture) => void) => {
  const raw = rawFixture('typical')

  mutate(raw)

  return raw
}

describe('fail closed', () => {
  it.each([
    [
      'validUntil null',
      (raw: RawFixture) => {
        raw.forecast.validUntil = null
      },
    ],
    [
      'publishedAt null',
      (raw: RawFixture) => {
        raw.forecast.publishedAt = null
      },
    ],
    [
      'publishedAt unparsable',
      (raw: RawFixture) => {
        raw.forecast.publishedAt = 'yesterday'
      },
    ],
    [
      'validUntil before publishedAt',
      (raw: RawFixture) => {
        raw.forecast.validUntil = '2020-01-01T00:00:00Z'
      },
    ],
    [
      'validUntil equal to publishedAt',
      (raw: RawFixture) => {
        raw.forecast.validUntil = raw.forecast.publishedAt
      },
    ],
    [
      'band level missing',
      (raw: RawFixture) => {
        delete raw.forecast.hazardLevels.alpine
      },
    ],
    [
      'band level out of range',
      (raw: RawFixture) => {
        raw.forecast.hazardLevels.alpine = '9'
      },
    ],
    [
      'band level numeric',
      (raw: RawFixture) => {
        raw.forecast.hazardLevels.alpine = 3
      },
    ],
    [
      'band level inherited key',
      (raw: RawFixture) => {
        raw.forecast.hazardLevels.alpine = 'toString'
      },
    ],
    [
      'unknown problem type',
      (raw: RawFixture) => {
        raw.forecast.avalancheProblems[0].type = 'unknown'
      },
    ],
    [
      'unknown sensitivity',
      (raw: RawFixture) => {
        raw.forecast.avalancheProblems[0].sensitivity = 'extreme'
      },
    ],
    [
      'unknown aspect',
      (raw: RawFixture) => {
        raw.forecast.avalancheProblems[0].aspects = { alpine: ['N'] }
      },
    ],
    [
      'avalancheSize 0',
      (raw: RawFixture) => {
        raw.forecast.avalancheProblems[0].avalancheSize = 0
      },
    ],
    [
      'avalancheSize 6',
      (raw: RawFixture) => {
        raw.forecast.avalancheProblems[0].avalancheSize = 6
      },
    ],
    [
      'avalancheSize null',
      (raw: RawFixture) => {
        raw.forecast.avalancheProblems[0].avalancheSize = null
      },
    ],
    [
      'thresholds not multiples of 100',
      (raw: RawFixture) => {
        raw.region.elevationLowM = 2050
      },
    ],
    [
      'low threshold not below high',
      (raw: RawFixture) => {
        raw.region.elevationLowM = 2600
      },
    ],
    [
      'non-positive threshold',
      (raw: RawFixture) => {
        raw.region.elevationLowM = 0
      },
    ],
    [
      'invalid region code',
      (raw: RawFixture) => {
        raw.region.caamlRegionId = 'ge-mm-01'
      },
    ],
  ])('rejects %s', (_label, mutate) => {
    expect(() => buildFromRaw(mutated(mutate))).toThrow(InvalidForecastError)
  })

  it('names fields, never values, in the error', () => {
    const raw = mutated((forecast) => {
      forecast.forecast.avalancheProblems[0].type = 'secret value'
    })

    expect(() => buildFromRaw(raw)).toThrow(/forecast\.avalancheProblems\.0\.type/)
    expect(() => buildFromRaw(raw)).not.toThrow(/secret value/)
  })

  it('accepts PostgREST timestamps', () => {
    const raw = mutated((forecast) => {
      forecast.forecast.publishedAt = '2026-12-10T14:05:11.482913+00:00'
      forecast.forecast.validUntil = '2026-12-11T14:00:00+00:00'
    })

    expect(buildFromRaw(raw).validTime).toEqual({
      endTime: '2026-12-11T14:00:00Z',
      startTime: '2026-12-10T14:05:11Z',
    })
  })
})

describe('publication time guard (spec §5.4)', () => {
  const buildAt = (offsetMs: number) => {
    const fixture = loadFixture('typical')
    const publishedAt = new Date(fixture.forecast.publishedAt).getTime()

    return () => buildBulletin({ ...fixture, now: new Date(publishedAt + offsetMs) })
  }

  it('accepts published_at up to 60 s in the future (clock skew)', () => {
    expect(buildAt(-59_000)).not.toThrow()
    expect(buildAt(-60_000)).not.toThrow()
  })

  it('rejects published_at more than 60 s in the future', () => {
    expect(buildAt(-61_000)).toThrow(/publishedAt is in the future/)
  })

  it('never falls back to created_at when published_at is missing', () => {
    const raw = mutated(({ forecast }) => {
      forecast.createdAt = '2026-12-10T13:00:00Z'
      forecast.publishedAt = null
    })

    expect(() => buildFromRaw(raw)).toThrow(InvalidForecastError)
  })
})

describe('validity', () => {
  it('serves an expired forecast with its true validity and expired: true', () => {
    const fixture = loadFixture('typical')
    const bulletin = buildBulletin({ ...fixture, now: new Date('2027-01-01T00:00:00Z') })

    expect(bulletin.customData.avalancheGeorgia.expired).toBe(true)
    expect(bulletin.validTime.endTime).toBe('2026-12-11T14:00:00Z')
  })

  it('is not expired before validUntil', () => {
    expect(buildBulletin(loadFixture('typical')).customData.avalancheGeorgia.expired).toBe(false)
  })
})

describe('bulletinId', () => {
  it('matches the RFC 4122 v5 known-answer vector (DNS namespace, "www.example.com")', () => {
    expect(uuidV5('www.example.com', '6ba7b810-9dad-11d1-80b4-00c04fd430c8')).toBe(
      '2ed6657d-e927-568b-95e1-2665a8aea6a2',
    )
  })

  it('is a stable, valid v5 UUID that differs per forecast', () => {
    expect(bulletinId(412)).toBe(bulletinId(412))
    expect(bulletinId(412)).toBe('0a85a087-a35d-548e-aaca-10a96d91bc31')
    expect(bulletinId(412)).not.toBe(bulletinId(413))
    expect(isUuid(bulletinId(412))).toBe(true)
    expect(bulletinId(412)[14]).toBe('5')
  })
})

describe('privacy', () => {
  it('never leaks forecaster names or emails', () => {
    const raw = mutated(({ forecast }) => {
      forecast.forecaster = 'Nino Forecasterishvili'
      forecast.createdByUserId = 'nino@example.org'
      forecast.avalancheProblems[0].forecaster = 'nino@example.org'
    })
    const serialized = JSON.stringify(buildFromRaw(raw))

    expect(serialized).not.toMatch(/Forecasterishvili|forecaster|createdBy/i)
    expect(serialized).not.toMatch(/[\w.+-]+@[\w-]+\.[\w.]+/)
  })
})
