import { dateFormat, timeFormat } from '@domain/constants'
import { format, parseISO } from 'date-fns'
import { useLocale } from 'next-intl'

import { getDateFnsLocale } from '@/lib/dateFnsLocale'
import { toTbilisiWallClock } from '@/lib/tbilisiTime'

const isoDayPattern = /^\d{4}-\d{2}-\d{2}$/

// A date-only value ("2026-10-04") is a calendar day: parseISO reads it as local
// midnight (`new Date` would read it as UTC, the day before west of Greenwich).
// A moment is shown as Georgia's wall-clock time, whatever the device's zone.
const toDate = (value: string | Date) =>
  typeof value === 'string' && isoDayPattern.test(value)
    ? parseISO(value)
    : toTbilisiWallClock(value)

// List dates ("04 Oct 2026") and times ("08:12") in the UI language
const useListDates = () => {
  const locale = getDateFnsLocale(useLocale())

  return {
    formatDate: (value: string | Date) => format(toDate(value), dateFormat, { locale }),
    formatDay: (value: string | Date) => format(toDate(value), 'EEE d MMM', { locale }),
    formatTime: (value: string | Date) => format(toDate(value), timeFormat, { locale }),
  }
}

export default useListDates
