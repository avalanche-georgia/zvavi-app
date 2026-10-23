import { describe, expect, it } from 'vitest'

import getSummaryHeadline from './getSummaryHeadline'

describe('getSummaryHeadline', () => {
  it('takes the first sentence as plain text', () => {
    expect(
      getSummaryHeadline(
        '**High danger in the high alpine.** Around 50 cm of new snow fell.\nMore below.',
      ),
    ).toBe('High danger in the high alpine.')
  })

  it('skips empty lines and keeps a sentence without a full stop', () => {
    expect(getSummaryHeadline('\n\n# Storm is over\nDetails')).toBe('Storm is over')
  })

  it('keeps link text and drops the address', () => {
    expect(getSummaryHeadline('See [the map](https://example.com) first. Then go.')).toBe(
      'See the map first.',
    )
  })

  it('does not end the sentence inside a number', () => {
    expect(getSummaryHeadline('Up to 2.5 m of snow fell. Stay off steep slopes.')).toBe(
      'Up to 2.5 m of snow fell.',
    )
  })

  it('shortens a long sentence at a word boundary', () => {
    const headline = getSummaryHeadline(`${'snow '.repeat(60)}fell.`)

    expect(headline).toMatch(/^snow( snow)*…$/)
    expect(headline!.length).toBeLessThanOrEqual(161)
  })

  it('returns null without a summary', () => {
    expect(getSummaryHeadline(null)).toBeNull()
    expect(getSummaryHeadline('  \n ')).toBeNull()
  })
})
