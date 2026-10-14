import { parseIsoDay } from '@components/features/admin/shared'
import { getSeasonRange } from '@domain/season'
import { endOfDay, startOfDay, subDays } from 'date-fns'

import type { DateRange } from './listParams'

export type CreatedBounds = { end: Date | null; start: Date | null }

type BoundsInput = { dateFrom: string | null; dateTo: string | null; now: Date; range: DateRange }

// The created-date window a range option stands for
export const getCreatedBounds = ({ dateFrom, dateTo, now, range }: BoundsInput): CreatedBounds => {
  // Calendar days including today — "30 days" is today and the 29 before it
  if (range === 'last30') return { end: null, start: startOfDay(subDays(now, 29)) }
  if (range === 'season') return getSeasonRange(now)

  if (range === 'custom') {
    const from = parseIsoDay(dateFrom)
    const to = parseIsoDay(dateTo)

    return { end: to && endOfDay(to), start: from && startOfDay(from) }
  }

  return { end: null, start: null }
}
