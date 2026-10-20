'use client'

import { differenceInCalendarDays, format } from 'date-fns'
import { useFormatter, useLocale, useNow } from 'next-intl'

import useIsClient from './useIsClient'

type DateSummaryOptions = {
  // Adds the time, and counts in hours and minutes ("in 22 hours") instead of days
  withTime?: boolean
}

// A picked date in words for a QuickDateField: "Wed, 21 Oct · 18:00 · in 1 day",
// or "Thu, 15 Oct · 5 days ago" for a date alone. Client-only: "now" and the
// device's day decide the relative part, and the server may be on another day.
const useDateSummary = (value: Date | null, { withTime = false }: DateSummaryOptions = {}) => {
  const formatter = useFormatter()
  const locale = useLocale()
  // Re-renders every minute so "in 22 hours" stays current
  const now = useNow({ updateInterval: 60_000 })
  const isClient = useIsClient()

  if (!value || !isClient) return null

  const day = formatter.dateTime(value, { day: 'numeric', month: 'short', weekday: 'short' })
  const relative = withTime
    ? formatter.relativeTime(value, now)
    : // "today", "yesterday", "5 days ago" (next-intl would say "in 0 days")
      new Intl.RelativeTimeFormat(locale, { numeric: 'auto' }).format(
        differenceInCalendarDays(value, now),
        'day',
      )

  return [day, withTime && format(value, 'HH:mm'), relative].filter(Boolean).join(' · ')
}

export default useDateSummary
