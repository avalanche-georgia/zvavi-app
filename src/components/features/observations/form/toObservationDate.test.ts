import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { observationFieldsSchema, withDateOrUnknown } from './schema'
import toObservationDate, { toObservationDateIso } from './toObservationDate'

describe('toObservationDate', () => {
  it('puts the time on the picked day', () => {
    expect(toObservationDate(new Date(2026, 9, 15, 12), '14:30')).toEqual(
      new Date(2026, 9, 15, 14, 30),
    )
  })

  it('sends the exact moment with a time, local noon without one', () => {
    expect(toObservationDateIso(new Date(2026, 9, 15), '14:30')).toBe(
      new Date(2026, 9, 15, 14, 30).toISOString(),
    )
    expect(toObservationDateIso(new Date(2026, 9, 15), null)).toBe(
      new Date(2026, 9, 15, 12).toISOString(),
    )
  })
})

describe('the date check', () => {
  const schema = withDateOrUnknown(
    observationFieldsSchema.pick({ date: true, isDateUnknown: true, time: true }),
  )

  beforeEach(() => {
    vi.useFakeTimers({ toFake: ['Date'] })
    vi.setSystemTime(new Date(2026, 9, 20, 12, 0))
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
