// "* text", "- text" or "• text" — the marker must be followed by a space, so a
// line that merely starts with *italic* markdown isn't taken for a bullet
const bulletPattern = /^[*•-]\s+/

// Additional hazards are written one per line with a leading bullet. Returns
// the items without their bullets, or null when the text isn't a list.
const parseHazardItems = (text: string): string[] | null => {
  const lines = text
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)

  if (!lines.some((line) => bulletPattern.test(line))) return null

  return lines.map((line) => line.replace(bulletPattern, ''))
}

export default parseHazardItems
