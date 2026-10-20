import { describe, expect, it } from 'vitest'

import { formatTimeInput } from './formatTimeInput'

// Feeds the text key by key, the way typing does
const typeText = (keys: string) =>
  [...keys].reduce((text, key) => formatTimeInput(text + key, text), '')

describe('formatTimeInput', () => {
  it.each([
    ['1', '1'],
    ['12', '12:'],
    ['123', '12:3'],
    ['1234', '12:34'],
    ['12345', '12:34'],
    ['9', '9:'],
    ['930', '9:30'],
    ['2', '2'],
    ['23', '23:'],
    ['25', '2:5'],
    ['0', '0'],
    ['07', '07:'],
    ['0715', '07:15'],
  ])('types %j as %j', (keys, text) => {
    expect(typeText(keys)).toBe(text)
  })

  it('keeps a typed colon and drops anything else', () => {
    expect(formatTimeInput('9:3', '9')).toBe('9:3')
    expect(formatTimeInput('18:30', '')).toBe('18:30')
    expect(formatTimeInput('1a:3b', '1a:3')).toBe('1:3')
  })

  it('lets the colon be deleted', () => {
    expect(formatTimeInput('12', '12:')).toBe('12')
    expect(formatTimeInput('1', '12')).toBe('1')
    expect(formatTimeInput('', '1')).toBe('')
  })
})
