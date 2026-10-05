// Markdown summary → one plain line, for the excerpt and for search
export const toPlainText = (markdown: string | null) =>
  (markdown ?? '')
    // links and images → their text
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1')
    // list markers at line starts
    .replace(/^\s*(?:[-+*]|\d+\.)\s+/gm, '')
    // emphasis, headings, quotes, code ticks
    .replace(/[*_~`#>]+/g, '')
    .replace(/\s+/g, ' ')
    .trim()
