import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { observationFieldsSchema, withDateOrUnknown } from './schema'
import toObservationDate, { fromObservationDate, toObservationDateIso } from './toObservationDate'

describe('toObservationDate', () => {
  // Tbilisi is UTC+4, whatever time zone the device is in
  it('reads the time as Tbilisi time on the picked day', () => {
    expect(toObservationDate(new Date(2026, 9, 15, 12), '14:30').toISOString()).toBe(
      '2026-10-15T10:30:00.000Z',
    )
    expect(toObservationDate(new Date(2026, 9, 15), '02:00').toISOString()).toBe(
      '2026-10-14T22:00:00.000Z',
    )
  })

  it('sends the exact moment with a time, Tbilisi noon without one', () => {
    expect(toObservationDateIso(new Date(2026, 9, 15), '14:30')).toBe('2026-10-15T10:30:00.000Z')
    expect(toObservationDateIso(new Date(2026, 9, 15), null)).toBe('2026-10-15T08:00:00.000Z')
  })

  it('reads a stored moment back as the Tbilisi day and time', () => {
    expect(fromObservationDate(new Date('2026-10-14T22:00:00.000Z'))).toEqual({
      day: new Date(2026, 9, 15),
      time: '02:00',
    })
  })
})

describe('the date check', () => {
  const schema = withDateOrUnknown(
    observationFieldsSchema.pick({ date: true, isDateUnknown: true, time: true }),
  )

  beforeEach(() => {
    vi.useFakeTimers({ toFake: ['Date'] })
    // 14:00 in Tbilisi
    vi.setSystemTime(new Date('2026-10-20T10:00:00.000Z'))
  })

  afterEach(() => vi.useRealTimers())

  it('accepts today with a past time, or no time', () => {
    const today = new Date(2026, 9, 20)

    expect(schema.safeParse({ date: today, isDateUnknown: false, time: '09:15' }).success).toBe(
      true,
    )
    expect(schema.safeParse({ date: today, isDateUnknown: false, time: null }).success).toBe(true)
  })

  it('rejects today at a later hour', () => {
    const result = schema.safeParse({
      date: new Date(2026, 9, 20),
      isDateUnknown: false,
      time: '18:00',
    })

    expect(result.success).toBe(false)
    expect(result.error?.issues[0]).toMatchObject({ message: 'futureDate', path: ['date'] })
  })

  it('needs a date or "Not sure"', () => {
    expect(schema.safeParse({ date: null, isDateUnknown: true, time: null }).success).toBe(true)
    expect(schema.safeParse({ date: null, isDateUnknown: false, time: null }).success).toBe(false)
  })
})
