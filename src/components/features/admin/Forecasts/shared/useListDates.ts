import { dateFormat, timeFormat } from '@domain/constants'
import { format } from 'date-fns'
import { useLocale } from 'next-intl'

import { getDateFnsLocale } from '@/lib/dateFnsLocale'

// List dates ("04 Oct 2026") and times ("08:12") in the UI language
const useListDates = () => {
  const locale = getDateFnsLocale(useLocale())

  return {
    formatDate: (value: string | Date) => format(value, dateFormat, { locale }),
    formatDay: (value: string | Date) => format(value, 'EEE d MMM', { locale }),
    formatTime: (value: string | Date) => format(value, timeFormat, { locale }),
  }
}

export default useListDates
