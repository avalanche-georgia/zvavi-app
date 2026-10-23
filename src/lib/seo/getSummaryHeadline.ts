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
  const firstLine = summary?.split('\n').find((line) => line.trim())

  if (!firstLine) return null

  const text = stripMarkdown(firstLine)
  const sentence = text.match(/^.+?[.!?](?=\s|$)/)?.[0] ?? text

  if (sentence.length <= maxLength) return sentence

  return `${sentence.slice(0, sentence.lastIndexOf(' ', maxLength - 1))}…`
}

export default getSummaryHeadline
