import { format, parseISO } from 'date-fns'
import type { Locale } from 'react-day-picker'

import type { DayRange } from './dayRange'

// "12 Dec – 3 Jan 2026" (the year once when both ends share it), "12 Dec 2025 – …"
// for a start only, "… – 3 Jan 2026" for an end only; null when nothing is set
export const formatDayRange = ({ from, to }: DayRange, locale: Locale) => {
  const formatDay = (day: string, pattern: string) => format(parseISO(day), pattern, { locale })

  if (from && to) {
    if (from === to) return formatDay(from, 'd MMM yyyy')

    const isSameYear = from.slice(0, 4) === to.slice(0, 4)

    return `${formatDay(from, isSameYear ? 'd MMM' : 'd MMM yyyy')} – ${formatDay(to, 'd MMM yyyy')}`
  }

  if (from) return `${formatDay(from, 'd MMM yyyy')} – …`
  if (to) return `… – ${formatDay(to, 'd MMM yyyy')}`

  return null
}
