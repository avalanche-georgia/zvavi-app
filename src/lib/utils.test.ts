import { describe, expect, it } from 'vitest'

import { cn } from './utils'

describe('cn', () => {
  it('keeps a type token next to a text colour', () => {
    expect(cn('text-title', 'text-ink')).toBe('text-title text-ink')
  })

  it('keeps border-slot next to a border colour', () => {
    expect(cn('border-off', 'border-slot')).toBe('border-off border-slot')
  })

  it('keeps leading-prose after a type token', () => {
    expect(cn('text-copy-lg', 'leading-prose')).toBe('text-copy-lg leading-prose')
  })
})
