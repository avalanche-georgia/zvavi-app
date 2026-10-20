import { useMemo } from 'react'
import { getSeasonRange } from '@domain/season'
import { format, parseISO, subDays } from 'date-fns'

import type { ObservationsFilters } from '../helpers/searchParams'

import { endOfTbilisiDay, getTbilisiTodayIso, startOfTbilisiDay } from '@/lib/tbilisiTime'

// Calendar days including today — "7 days" is today and the 6 before it
const periodDays = { '30d': 30, '7d': 7 } as const

// Period filter → ISO bounds for the API, by Georgia's calendar days. Computed per
// day, so the query key (and the cache) stays stable while the page is open.
const useDateRange = ({ from, period, to }: ObservationsFilters) => {
  const today = getTbilisiTodayIso()

  return useMemo(() => {
    if (period === '7d' || period === '30d') {
      return {
        dateFrom: startOfTbilisiDay(
          format(subDays(parseISO(today), periodDays[period] - 1), 'yyyy-MM-dd'),
        ).toISOString(),
      }
    }

    if (period === 'season') {
      const { end, start } = getSeasonRange(parseISO(today))

      return { dateFrom: start.toISOString(), dateTo: end.toISOString() }
    }

    if (period === 'unknown') return { isDateUnknown: true }

    if (period === 'custom') {
      return {
        dateFrom: from ? startOfTbilisiDay(from).toISOString() : undefined,
        dateTo: to ? endOfTbilisiDay(to).toISOString() : undefined,
      }
    }

    return {}
  }, [from, period, to, today])
}

export default useDateRange
