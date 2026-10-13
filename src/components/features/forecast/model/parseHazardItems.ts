// "* text", "- text" or "• text" — the marker must be followed by a space, so a
// line that merely starts with *italic* markdown isn't taken for a bullet
const bulletPattern = /^[*•-]\s+/

export type HazardItems = {
  // Text before the first bullet, e.g. "Watch for:"
  intro: string
  items: string[]
}

// Additional hazards are written one per line with a leading bullet. Returns
// the items without their bullets (a line without one continues the item
// above it), or null when the text isn't a list.
const parseHazardItems = (text: string): HazardItems | null => {
  const lines = text
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)

  if (!lines.some((line) => bulletPattern.test(line))) return null

  const intro: string[] = []
  const items: string[] = []

  lines.forEach((line) => {
    if (bulletPattern.test(line)) items.push(line.replace(bulletPattern, ''))
    else if (items.length === 0) intro.push(line)
    else items[items.length - 1] += `\n${line}`
  })

  return { intro: intro.join('\n'), items }
}

export default parseHazardItems
