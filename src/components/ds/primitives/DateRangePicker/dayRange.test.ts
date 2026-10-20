import { enUS, ka } from 'react-day-picker/locale'
import { describe, expect, it } from 'vitest'

import { getInitialEnd, isSameRange, pickDay } from './dayRange'
import { formatDayRange } from './formatDayRange'

describe('pickDay', () => {
  it('starts a fresh range, then completes it', () => {
    const first = pickDay({ from: null, to: null }, 'new', '2026-10-05')

    expect(first).toEqual({ nextEnd: 'to', range: { from: '2026-10-05', to: null } })

    const second = pickDay(first.range, first.nextEnd, '2026-10-12')

    expect(second).toEqual({ nextEnd: 'new', range: { from: '2026-10-05', to: '2026-10-12' } })
  })

  it('starts afresh after a complete range', () => {
    expect(pickDay({ from: '2026-10-05', to: '2026-10-12' }, 'new', '2026-10-20')).toEqual({
      nextEnd: 'to',
      range: { from: '2026-10-20', to: null },
    })
  })

  it('moves only the start when From is picked, keeping a later end', () => {
    expect(pickDay({ from: '2026-10-05', to: '2026-10-12' }, 'from', '2026-10-08')).toEqual({
      nextEnd: 'new',
      range: { from: '2026-10-08', to: '2026-10-12' },
    })
  })

  it('drops the end when the new start is after it', () => {
    expect(pickDay({ from: '2026-10-05', to: '2026-10-12' }, 'from', '2026-10-20')).toEqual({
      nextEnd: 'to',
      range: { from: '2026-10-20', to: null },
    })
  })

  it('moves only the end when To is picked', () => {
    expect(pickDay({ from: '2026-10-05', to: '2026-10-12' }, 'to', '2026-10-15')).toEqual({
      nextEnd: 'new',
      range: { from: '2026-10-05', to: '2026-10-15' },
    })
  })

  it('takes a day before the start, while picking the end, as the new start', () => {
    expect(pickDay({ from: '2026-10-05', to: null }, 'to', '2026-10-01')).toEqual({
      nextEnd: 'to',
      range: { from: '2026-10-01', to: null },
    })
  })

  it('sets an end on its own: "up to a date"', () => {
    expect(pickDay({ from: null, to: null }, 'to', '2026-10-12')).toEqual({
      nextEnd: 'new',
      range: { from: null, to: '2026-10-12' },
    })
  })

  it('allows a one-day range', () => {
    expect(pickDay({ from: '2026-10-05', to: null }, 'to', '2026-10-05').range).toEqual({
      from: '2026-10-05',
      to: '2026-10-05',
    })
  })
})

describe('getInitialEnd', () => {
  it.each([
    [{ from: null, to: null }, 'new'],
    [{ from: '2026-10-05', to: null }, 'to'],
    [{ from: null, to: '2026-10-12' }, 'from'],
    [{ from: '2026-10-05', to: '2026-10-12' }, 'new'],
  ] as const)('opens %j on %s', (range, end) => {
    expect(getInitialEnd(range)).toBe(end)
  })
})

describe('isSameRange', () => {
  it('compares both ends', () => {
    expect(isSameRange({ from: 'a', to: 'b' }, { from: 'a', to: 'b' })).toBe(true)
    expect(isSameRange({ from: 'a', to: 'b' }, { from: 'a', to: null })).toBe(false)
  })
})

describe('formatDayRange', () => {
  it.each([
    [{ from: '2026-10-05', to: '2026-10-12' }, '5 Oct – 12 Oct 2026'],
    [{ from: '2025-12-12', to: '2026-01-03' }, '12 Dec 2025 – 3 Jan 2026'],
    [{ from: '2026-10-05', to: '2026-10-05' }, '5 Oct 2026'],
    [{ from: '2025-12-12', to: null }, '12 Dec 2025 – …'],
    [{ from: null, to: '2026-01-03' }, '… – 3 Jan 2026'],
    [{ from: null, to: null }, null],
  ])('formats %j as %s', (range, text) => {
    expect(formatDayRange(range, enUS)).toBe(text)
  })

  it('uses the given language', () => {
    expect(formatDayRange({ from: '2026-10-05', to: null }, ka)).toMatch(/ოქტ/)
  })
})
