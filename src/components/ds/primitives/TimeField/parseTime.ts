const pad = (part: number) => String(part).padStart(2, '0')

// "18:30" → 18, 30 · "1830" / "930" → last two digits are minutes · "18" / "9" / "18:"
// (the field puts the colon in as you type) → whole hour
const splitTime = (text: string) => {
  if (/^\d{1,2}:$/.test(text)) return [text.slice(0, -1), '0']
  if (text.includes(':')) return text.split(':')
  if (text.length <= 2) return [text, '0']

  return [text.slice(0, -2), text.slice(-2)]
}

// Reads what people type as a 24-hour time. Returns HH:mm, or null when it isn't one.
export const parseTime = (text: string): string | null => {
  const parts = splitTime(text.trim())
  const [hoursText, minutesText] = parts

  if (parts.length !== 2 || !/^\d{1,2}$/.test(hoursText) || !/^\d{1,2}$/.test(minutesText)) {
    return null
  }

  const hours = Number(hoursText)
  const minutes = Number(minutesText)

  if (hours > 23 || minutes > 59) return null

  return `${pad(hours)}:${pad(minutes)}`
}
