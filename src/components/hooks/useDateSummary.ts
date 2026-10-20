'use client'

import { differenceInCalendarDays } from 'date-fns'
import { useFormatter, useLocale, useNow } from 'next-intl'

import useIsClient from './useIsClient'

import { atTbilisiTime, getTbilisiToday } from '@/lib/tbilisiTime'

type DateSummaryOptions = {
  // Adds the time, and counts in hours and minutes ("in 22 hours") instead of days
  withTime?: boolean
}

// A picked date in words for a QuickDateField: "Wed, 21 Oct · 18:00 · in 1 day",
// or "Thu, 15 Oct · 5 days ago" for a date alone. Days and times are Georgia's
// (a date alone is a calendar day). Client-only: "now" drives the relative part.
const useDateSummary = (value: Date | null, { withTime = false }: DateSummaryOptions = {}) => {
  const formatter = useFormatter()
  const locale = useLocale()
  // Re-renders every minute so "in 22 hours" stays current
  const now = useNow({ updateInterval: 60_000 })
  const isClient = useIsClient()

  if (!value || !isClient) return null

  // next-intl formats in Georgian time; a calendar day is read as its noon there
  const moment = withTime ? value : atTbilisiTime(value, '12:00')
  const day = formatter.dateTime(moment, { day: 'numeric', month: 'short', weekday: 'short' })
  const relative = withTime
    ? formatter.relativeTime(value, now)
    : // "today", "yesterday", "5 days ago" (next-intl would say "in 0 days")
      new Intl.RelativeTimeFormat(locale, { numeric: 'auto' }).format(
        differenceInCalendarDays(value, getTbilisiToday()),
        'day',
      )

  // Tbilisi time, like everywhere the date is shown later
  const time =
    withTime && formatter.dateTime(value, { hour: '2-digit', hourCycle: 'h23', minute: '2-digit' })

  return [day, time, relative].filter(Boolean).join(' · ')
}

export default useDateSummary
