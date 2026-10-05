import { describe, expect, it } from 'vitest'

import markdownToCaamlText from '../text'

describe('markdownToCaamlText (html)', () => {
  it.each([
    ['escapes &, < and >', 'a < b & c > d', 'a &lt; b &amp; c &gt; d'],
    ['turns bold into <b>', 'Danger **above 2000 m**.', 'Danger <b>above 2000 m</b>.'],
    ['turns a single newline into <br/>', 'one\ntwo', 'one<br/>two'],
    ['separates paragraphs with <br/><br/>', 'one\n\ntwo', 'one<br/><br/>two'],
    ['drops italic markup but keeps the text', '*very* careful', 'very careful'],
    ['keeps list item text', '- one\n- two', 'one<br/><br/>two'],
    [
      'escapes raw HTML instead of passing it through',
      '<script>alert(1)</script>',
      '&lt;script&gt;alert(1)&lt;/script&gt;',
    ],
    ['escapes inline raw HTML', 'a <b>b</b>', 'a &lt;b&gt;b&lt;/b&gt;'],
    ['normalises \\r\\n', 'one\r\ntwo\r\n\r\nthree', 'one<br/>two<br/><br/>three'],
    ['keeps link text', '[forecast](https://example.org)', 'forecast'],
    ['keeps heading text as a paragraph', '# Title\n\nBody', 'Title<br/><br/>Body'],
    ['keeps code text', '`a<b`', 'a&lt;b'],
    ['keeps image alt text', '![wind slab](x.png)', 'wind slab'],
  ])('%s', (_label, markdown, expected) => {
    expect(markdownToCaamlText(markdown, 'html')).toBe(expected)
  })

  it.each(['', '   ', '\n\n'])('returns empty for blank input %j', (markdown) => {
    expect(markdownToCaamlText(markdown, 'html')).toBe('')
  })
})

describe('markdownToCaamlText (plain)', () => {
  it('emits no tags and no escaping', () => {
    expect(markdownToCaamlText('**Bold** a < b\nc\n\npara', 'plain')).toBe('Bold a < b\nc\n\npara')
  })
})
