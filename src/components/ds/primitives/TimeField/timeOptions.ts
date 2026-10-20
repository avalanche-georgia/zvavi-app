const pad = (part: number) => String(part).padStart(2, '0')

// Every `step` minutes of a day, as HH:mm
export const getTimeOptions = (step: number) =>
  Array.from({ length: Math.ceil((24 * 60) / step) }, (_, index) => {
    const minutes = index * step

    return `${pad(Math.floor(minutes / 60))}:${pad(minutes % 60)}`
  })

// Whether a listed time fits what's typed so far, with or without the colon or a
// leading zero: "18", "18:3", "1830" and "930" all find their times
export const matchesTime = (time: string, query: string) => {
  const typed = query.replace(':', '').trim()

  if (!typed) return true

  const digits = time.replace(':', '')

  return digits.startsWith(typed) || digits.replace(/^0/, '').startsWith(typed)
}
