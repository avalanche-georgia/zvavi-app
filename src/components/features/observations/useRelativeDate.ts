import { differenceInCalendarDays } from 'date-fns'
import { useLocale } from 'next-intl'

// Scripts without letter case in running text — Georgian has capital
// (Mtavruli) letters, but they're never used to start a sentence
const caselessLocales = new Set(['ka'])

type RelativeDateOptions = {
  // Sentence case for standalone use ("Yesterday"); off when inserted mid-sentence
  isCapitalized?: boolean
  now?: Date
}

// Coarse, day-level relative dates: "today", "yesterday", "3 days ago",
// "last week", "2 months ago" — localized by Intl, no translation keys needed.
const useRelativeDate = () => {
  const locale = useLocale()
  const formatter = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' })

  const formatDays = (daysAgo: number) => {
    if (daysAgo < 7) return formatter.format(-daysAgo, 'day')
    if (daysAgo < 30) return formatter.format(-Math.round(daysAgo / 7), 'week')
    if (daysAgo < 365) return formatter.format(-Math.round(daysAgo / 30), 'month')

    return formatter.format(-Math.round(daysAgo / 365), 'year')
  }

  return (
    date: Date | string,
    { isCapitalized = false, now = new Date() }: RelativeDateOptions = {},
  ) => {
    const text = formatDays(Math.max(0, differenceInCalendarDays(now, new Date(date))))

    if (!isCapitalized || caselessLocales.has(locale)) return text

    return text.charAt(0).toLocaleUpperCase(locale) + text.slice(1)
  }
}

export default useRelativeDate
