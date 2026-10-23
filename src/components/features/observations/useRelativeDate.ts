import { differenceInCalendarDays } from 'date-fns'
import { useLocale, useTranslations } from 'next-intl'

import { toTbilisiWallClock } from '@/lib/tbilisiTime'

// Scripts without letter case in running text — Georgian has capital
// (Mtavruli) letters, but they're never used to start a sentence
const caselessLocales = new Set(['ka'])

type RelativeDateOptions = {
  // Sentence case for standalone use ("Yesterday"); off when inserted mid-sentence
  isCapitalized?: boolean
  now?: Date
}

// Coarse, day-level relative dates: "today", "yesterday", "3 days ago",
// "last week", "2 months ago". Translation keys, not Intl.RelativeTimeFormat:
// Chrome has no Georgian data for it and falls back to English, so the browser
// would disagree with the server-rendered text.
const useRelativeDate = () => {
  const t = useTranslations()
  const locale = useLocale()

  const formatDays = (daysAgo: number) => {
    if (daysAgo === 0) return t('common.relativeDate.today')
    if (daysAgo === 1) return t('common.relativeDate.yesterday')
    if (daysAgo < 7) return t('common.relativeDate.daysAgo', { count: daysAgo })
    if (daysAgo < 30) return t('common.relativeDate.weeksAgo', { count: Math.round(daysAgo / 7) })

    if (daysAgo < 365) {
      return t('common.relativeDate.monthsAgo', { count: Math.round(daysAgo / 30) })
    }

    return t('common.relativeDate.yearsAgo', { count: Math.round(daysAgo / 365) })
  }

  return (
    date: Date | string,
    { isCapitalized = false, now = new Date() }: RelativeDateOptions = {},
  ) => {
    // Days count in Georgia
    const daysAgo = differenceInCalendarDays(toTbilisiWallClock(now), toTbilisiWallClock(date))
    const text = formatDays(Math.max(0, daysAgo))

    if (!isCapitalized || caselessLocales.has(locale)) return text

    return text.charAt(0).toLocaleUpperCase(locale) + text.slice(1)
  }
}

export default useRelativeDate
