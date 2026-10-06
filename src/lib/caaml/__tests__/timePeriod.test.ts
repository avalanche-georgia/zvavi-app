import { describe, expect, it } from 'vitest'

import { InvalidForecastError } from '../errors'
import { toValidTimePeriod } from '../timePeriod'

// Asia/Tbilisi is UTC+4 all year
const windowOf = (start: string | null, end: string | null) =>
  toValidTimePeriod({ isAllDay: false, timeOfDay: { end, start } })

describe('toValidTimePeriod', () => {
  it('is all_day when flagged all day, even with a window', () => {
    expect(
      toValidTimePeriod({
        isAllDay: true,
        timeOfDay: { end: '2026-12-12T06:00:00Z', start: '2026-12-12T03:00:00Z' },
      }),
    ).toBe('all_day')
  })

  it.each([
    ['start null', null, '2026-12-12T06:00:00Z'],
    ['end null', '2026-12-12T03:00:00Z', null],
  ])('is all_day when %s', (_label, start, end) => {
    expect(windowOf(start, end)).toBe('all_day')
  })

  it('is all_day when timeOfDay is null', () => {
    expect(toValidTimePeriod({ isAllDay: false, timeOfDay: null })).toBe('all_day')
  })

  it.each([
    ['ends exactly at 12:00', '2026-12-12T03:00:00Z', '2026-12-12T08:00:00Z', 'earlier'],
    ['starts exactly at 12:00', '2026-12-12T08:00:00Z', '2026-12-12T10:00:00Z', 'later'],
    ['spans noon', '2026-12-12T06:00:00Z', '2026-12-12T10:00:00Z', 'all_day'],
    ['crosses local midnight', '2026-12-12T18:00:00Z', '2026-12-13T02:00:00Z', 'all_day'],
    ['has zero length', '2026-12-12T05:00:00Z', '2026-12-12T05:00:00Z', 'all_day'],
    // 20:00Z is 00:00 local the next day
    [
      'starts at the UTC/local day boundary',
      '2026-12-12T20:00:00Z',
      '2026-12-13T02:00:00Z',
      'earlier',
    ],
    [
      'uses PostgREST timestamps',
      '2026-12-12T03:00:00.482913+00:00',
      '2026-12-12T07:30:00+00:00',
      'earlier',
    ],
  ])('%s', (_label, start, end, expected) => {
    expect(windowOf(start, end)).toBe(expected)
  })

  it('ignores the date part', () => {
    expect(windowOf('2026-01-01T03:00:00Z', '2027-06-30T07:00:00Z')).toBe('earlier')
  })

  it('fails closed on an unparsable timestamp', () => {
    expect(() => windowOf('garbage', '2026-12-12T07:00:00Z')).toThrow(InvalidForecastError)
  })
})
