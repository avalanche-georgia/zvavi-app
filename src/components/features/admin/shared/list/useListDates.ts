import { dateFormat, timeFormat } from '@domain/constants'
import { format, parseISO } from 'date-fns'
import { useLocale } from 'next-intl'

import { getDateFnsLocale } from '@/lib/dateFnsLocale'

// parseISO reads a date-only value ("2026-10-04") as local midnight; `new Date`
// would read it as UTC and show the day before west of Greenwich
const toDate = (value: string | Date) => (typeof value === 'string' ? parseISO(value) : value)

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
