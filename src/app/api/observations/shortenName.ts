// Public display form of a submitter's name: first word + initial of the last
// one ("Evgeny Dus" → "Evgeny D."). Single-word names are shown as they are.
// Applied on read only — the stored name is never modified.
const shortenName = (name: string | null): string => {
  const words = (name ?? '').trim().split(/\s+/).filter(Boolean)

  if (words.length === 0) return ''
  if (words.length === 1) return words[0]

  // Array.from splits by code point, so non-BMP characters aren't cut in half
  const [lastInitial] = Array.from(words[words.length - 1])

  return `${words[0]} ${lastInitial.toLocaleUpperCase()}.`
}

export default shortenName
