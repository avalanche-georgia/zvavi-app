import type { Month } from 'date-fns'
import { useLocale } from 'next-intl'

import { parseMonthId } from '../model'

import { getDateFnsLocale } from '@/lib/dateFnsLocale'

const parseDay = (day: string) => ({ ...parseMonthId(day), day: Number(day.slice(8, 10)) })

// Date labels for the archive, from yyyy-MM-dd days and yyyy-MM months
const useArchiveFormat = () => {
  const { localize } = getDateFnsLocale(useLocale())
  const shortMonth = (month: number) =>
    localize.month(month as Month, { context: 'formatting', width: 'abbreviated' })

  // "12 Dec"
  const formatDayShort = (value: string) => {
    const { day, month } = parseDay(value)

    return `${day} ${shortMonth(month)}`
  }

  // "12 Dec 2025"
  const formatDay = (value: string) => `${formatDayShort(value)} ${parseDay(value).year}`

  // "16 Oct 2026" · "16–18 Oct 2026" · "27 Nov – 3 Dec 2026" · "27 Dec 2025 – 3 Jan 2026"
  const formatRange = (from: string, to: string) => {
    const start = parseDay(from)
    const end = parseDay(to)

    if (from >= to) return formatDay(from)

    if (start.year !== end.year) return `${formatDay(from)} – ${formatDay(to)}`

    if (start.month !== end.month) return `${formatDayShort(from)} – ${formatDay(to)}`

    return `${start.day}–${end.day} ${shortMonth(end.month)} ${end.year}`
  }

  // "December 2025"
  const formatMonth = (monthId: string) => {
    const { month, year } = parseMonthId(monthId)

    return `${localize.month(month as Month, { context: 'standalone', width: 'wide' })} ${year}`
  }

  // "Dec"
  const formatMonthShort = (monthId: string) =>
    localize.month(parseMonthId(monthId).month as Month, {
      context: 'standalone',
      width: 'abbreviated',
    })

  return { formatDay, formatDayShort, formatMonth, formatMonthShort, formatRange }
}

export default useArchiveFormat
