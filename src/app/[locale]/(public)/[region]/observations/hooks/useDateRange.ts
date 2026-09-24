import { useMemo } from 'react'
import { endOfDay, format, parseISO, startOfDay, subDays } from 'date-fns'

import getSeasonRange from '../helpers/getSeasonRange'
import type { ObservationsFilters } from '../helpers/searchParams'

// Calendar days including today — "7 days" is today and the 6 before it
const periodDays = { '30d': 30, '7d': 7 } as const

// Period filter → ISO bounds for the API. Computed per calendar day, so the
// query key (and the cache) stays stable while the page is open.
const useDateRange = ({ from, period, to }: ObservationsFilters) => {
  const today = format(new Date(), 'yyyy-MM-dd')

  return useMemo(() => {
    if (period === '7d' || period === '30d') {
      return {
        dateFrom: startOfDay(subDays(parseISO(today), periodDays[period] - 1)).toISOString(),
      }
    }

    if (period === 'season') {
      const { end, start } = getSeasonRange(parseISO(today))

      return { dateFrom: start.toISOString(), dateTo: end.toISOString() }
    }

    if (period === 'custom') {
      return {
        dateFrom: from ? startOfDay(parseISO(from)).toISOString() : undefined,
        dateTo: to ? endOfDay(parseISO(to)).toISOString() : undefined,
      }
    }

    return {}
  }, [from, period, to, today])
}

export default useDateRange
