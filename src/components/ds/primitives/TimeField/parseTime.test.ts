import { describe, expect, it } from 'vitest'

import { parseTime } from './parseTime'

describe('parseTime', () => {
  it.each([
    ['18:30', '18:30'],
    ['8:05', '08:05'],
    ['1830', '18:30'],
    ['930', '09:30'],
    ['18', '18:00'],
    ['9', '09:00'],
    [' 07:15 ', '07:15'],
    ['0', '00:00'],
    ['23:59', '23:59'],
  ])('reads %j as %s', (text, time) => {
    expect(parseTime(text)).toBe(time)
  })

  it.each(['', '24:00', '18:60', '12345', 'ab', '18:', ':30', '1:2:3', '-1'])(
    'rejects %j',
    (text) => {
      expect(parseTime(text)).toBeNull()
    },
  )
})
