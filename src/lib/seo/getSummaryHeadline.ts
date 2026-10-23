// Link previews cut descriptions around here
const maxLength = 160

const stripMarkdown = (text: string) =>
  text
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/^\s*(?:#+|>|[-*+]|\d+\.)\s+/, '')
    .replace(/[*_`~]/g, '')
    .trim()

// The summary's first sentence, as plain text — a hook that makes people open the forecast,
// not a retelling of it
const getSummaryHeadline = (summary: string | null) => {
  // The first line with words in it (a "***" rule strips down to nothing)
  const text = summary
    ?.split('\n')
    .map(stripMarkdown)
    .find((line) => line)

  if (!text) return null

  // Up to the first full stop, keeping a closing quote or bracket
  const sentence = text.match(/^.+?[.!?]["'”»)\]]*(?=\s|$)/)?.[0] ?? text

  if (sentence.length <= maxLength) return sentence

  const lastSpace = sentence.lastIndexOf(' ', maxLength - 1)

  return `${sentence.slice(0, lastSpace > 0 ? lastSpace : maxLength - 1)}…`
}

export default getSummaryHeadline
