import type { Day, Month } from 'date-fns'
import { useLocale } from 'next-intl'

import { getDateFnsLocale } from '@/lib/dateFnsLocale'

// Georgia is UTC+4 all year (no daylight saving)
const tbilisiOffsetMs = 4 * 60 * 60 * 1000

const pad = (value: number) => String(value).padStart(2, '0')

// The wall-clock time in Georgia, read through the UTC getters of a shifted
// date. Forecast times are Georgian local times for every reader, and reading
// them this way never touches the runtime's own zone — so the server and the
// browser agree. (`Intl` can't do this: browsers lack Georgian date formatting,
// the server has it, and the two would disagree.)
const toTbilisiParts = (value: Date | string) => {
  const shifted = new Date(new Date(value).getTime() + tbilisiOffsetMs)

  return {
    day: shifted.getUTCDate(),
    hours: shifted.getUTCHours(),
    minutes: shifted.getUTCMinutes(),
    month: shifted.getUTCMonth() as Month,
    weekday: shifted.getUTCDay() as Day,
    year: shifted.getUTCFullYear(),
  }
}

const useForecastDates = () => {
  const { localize } = getDateFnsLocale(useLocale())
  const getMonth = (month: Month) =>
    localize.month(month, { context: 'formatting', width: 'abbreviated' })
  const getWeekday = (weekday: Day) =>
    localize.day(weekday, { context: 'formatting', width: 'abbreviated' })

  return {
    // "15 Apr 2026"
    formatDate: (value: Date | string) => {
      const { day, month, year } = toTbilisiParts(value)

      return `${day} ${getMonth(month)} ${year}`
    },
    // "Wed 15 Apr"
    formatDay: (value: Date | string) => {
      const { day, month, weekday } = toTbilisiParts(value)

      return `${getWeekday(weekday)} ${day} ${getMonth(month)}`
    },
    // "Tuesday, 14 October"
    formatLongDay: (value: Date | string) => {
      const { day, month, weekday } = toTbilisiParts(value)
      const weekdayName = localize.day(weekday, { context: 'formatting', width: 'wide' })
      const monthName = localize.month(month, { context: 'formatting', width: 'wide' })

      return `${weekdayName}, ${day} ${monthName}`
    },
    // "07:37"
    formatTime: (value: Date | string) => {
      const { hours, minutes } = toTbilisiParts(value)

      return `${pad(hours)}:${pad(minutes)}`
    },
    // Position of a time within its day, 0 (00:00) → 1 (24:00)
    getDayFraction: (value: Date | string) => {
      const { hours, minutes } = toTbilisiParts(value)

      return (hours * 60 + minutes) / (24 * 60)
    },
  }
}

export default useForecastDates
