import { getSeasonRange } from '@domain/season'
import { format, parseISO, subDays } from 'date-fns'

import type { DateRange } from './listParams'

import { endOfTbilisiDay, formatTbilisi, startOfTbilisiDay } from '@/lib/tbilisiTime'

export type CreatedBounds = { end: Date | null; start: Date | null }

type BoundsInput = { dateFrom: string | null; dateTo: string | null; now: Date; range: DateRange }

// The created-date window a range option stands for, by Georgia's calendar days
export const getCreatedBounds = ({ dateFrom, dateTo, now, range }: BoundsInput): CreatedBounds => {
  // Calendar days including today — "30 days" is today and the 29 before it
  if (range === 'last30') {
    const today = formatTbilisi(now, 'yyyy-MM-dd')

    return {
      end: null,
      start: startOfTbilisiDay(format(subDays(parseISO(today), 29), 'yyyy-MM-dd')),
    }
  }

  if (range === 'season') return getSeasonRange(now)

  if (range === 'custom') {
    return {
      end: dateTo ? endOfTbilisiDay(dateTo) : null,
      start: dateFrom ? startOfTbilisiDay(dateFrom) : null,
    }
  }

  return { end: null, start: null }
}
