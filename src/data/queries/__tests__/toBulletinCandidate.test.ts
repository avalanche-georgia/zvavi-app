import { describe, expect, it } from 'vitest'

import toBulletinCandidate from '../toBulletinCandidate'

import { parseBulletinSource } from '@/lib/caaml/input'

// Shaped like PostgREST responses: snake_case columns and jsonb keys, +00:00 timestamps
const region = {
  caaml_region_id: 'GE-MM-01',
  elevation_high_m: 2600,
  elevation_low_m: 2000,
  id: 'gudauri' as const,
  name_en: 'Gudauri',
}

const forecast = {
  additional_hazards: null,
  created_at: '2026-12-10T13:58:00.123456+00:00',
  hazard_levels: { alpine: '3', high_alpine: '4', overall: '4', sub_alpine: '2' },
  id: 64,
  published_at: '2026-12-10T14:05:11.482913+00:00',
  region_id: 'gudauri' as const,
  snowpack: null,
  summary: '**High** danger.',
  valid_until: '2026-12-11T14:00:00+00:00',
  weather: null,
}

const problem = {
  aspects: { alpine: ['n'], high_alpine: ['n', 'ne'], sub_alpine: [] },
  avalanche_size: 3,
  confidence: null,
  description: null,
  distribution: 'widespread' as const,
  is_all_day: false,
  order: 0,
  sensitivity: 'reactive' as const,
  time_of_day: { end: '2026-12-11T07:00:00.000Z', start: '2026-12-11T02:00:00.000Z' },
  trend: null,
  type: 'windSlab' as const,
}

describe('toBulletinCandidate', () => {
  it('maps PostgREST rows, including snake_case jsonb keys and nulls, to the transformer contract', () => {
    const candidate = toBulletinCandidate({ forecast, problems: [problem], region })
    const source = parseBulletinSource(candidate)

    expect(candidate.forecastId).toBe(64)
    expect(candidate.regionId).toBe('gudauri')
    expect(source.region).toEqual({
      caamlRegionId: 'GE-MM-01',
      elevationHighM: 2600,
      elevationLowM: 2000,
      id: 'gudauri',
      nameEn: 'Gudauri',
    })
    expect(source.forecast.hazardLevels).toEqual({
      alpine: '3',
      highAlpine: '4',
      overall: '4',
      subAlpine: '2',
    })
    expect(source.forecast.avalancheProblems[0]).toMatchObject({
      aspects: { alpine: ['n'], highAlpine: ['n', 'ne'], subAlpine: [] },
      avalancheSize: 3,
      confidence: null,
      isAllDay: false,
      timeOfDay: { end: '2026-12-11T07:00:00.000Z', start: '2026-12-11T02:00:00.000Z' },
    })
    expect(source.forecast.publishedAt).toBe('2026-12-10T14:05:11.482913+00:00')
  })

  it('accepts legacy rows whose jsonb keys are already camelCase', () => {
    const legacyForecast = {
      ...forecast,
      hazard_levels: { alpine: '3', highAlpine: '4', overall: '4', subAlpine: '2' },
    }
    const legacyProblem = {
      ...problem,
      aspects: { alpine: [], highAlpine: ['s'], subAlpine: [] },
      time_of_day: null,
    }
    const source = parseBulletinSource(
      toBulletinCandidate({ forecast: legacyForecast, problems: [legacyProblem], region }),
    )

    expect(source.forecast.hazardLevels.highAlpine).toBe('4')
    expect(source.forecast.avalancheProblems[0].aspects?.highAlpine).toEqual(['s'])
    expect(source.forecast.avalancheProblems[0].timeOfDay).toBeNull()
  })

  it('accepts a forecast without an overall level', () => {
    const source = parseBulletinSource(
      toBulletinCandidate({
        forecast: {
          ...forecast,
          hazard_levels: { alpine: '1', high_alpine: '1', sub_alpine: '0' },
        },
        problems: [],
        region,
      }),
    )

    expect(source.forecast.hazardLevels.overall).toBeUndefined()
  })
})
