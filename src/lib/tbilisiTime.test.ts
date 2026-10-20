import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import {
  atTbilisiTime,
  formatTbilisi,
  fromTbilisiWallClock,
  getTbilisiToday,
  getTbilisiTodayIso,
  toTbilisiWallClock,
} from './tbilisiTime'

// Run with TZ=Europe/Berlin or TZ=America/Los_Angeles too: results must not move
describe('tbilisiTime', () => {
  it('reads a moment as Georgian wall-clock time', () => {
    const wallClock = toTbilisiWallClock('2026-10-14T22:30:00.000Z')

    expect([wallClock.getDate(), wallClock.getHours(), wallClock.getMinutes()]).toEqual([15, 2, 30])
    expect(formatTbilisi('2026-10-14T22:30:00.000Z', 'yyyy-MM-dd HH:mm')).toBe('2026-10-15 02:30')
  })

  it('turns a Georgian wall-clock time back into the moment', () => {
    expect(fromTbilisiWallClock(new Date(2026, 9, 15, 2, 30)).toISOString()).toBe(
      '2026-10-14T22:30:00.000Z',
    )
    expect(atTbilisiTime(new Date(2026, 9, 21), '18:00').toISOString()).toBe(
      '2026-10-21T14:00:00.000Z',
    )
  })

  it('round-trips', () => {
    const moment = new Date('2026-03-29T01:45:00.000Z')

    expect(fromTbilisiWallClock(toTbilisiWallClock(moment)).getTime()).toBe(moment.getTime())
  })

  describe('today', () => {
    beforeEach(() => {
      vi.useFakeTimers({ toFake: ['Date'] })
      // 22:30 UTC on the 14th is already 02:30 on the 15th in Georgia
      vi.setSystemTime(new Date('2026-10-14T22:30:00.000Z'))
    })

    afterEach(() => vi.useRealTimers())

    it('is the Georgian day', () => {
      expect(getTbilisiTodayIso()).toBe('2026-10-15')
      expect(getTbilisiToday()).toEqual(new Date(2026, 9, 15))
    })
  })
})
