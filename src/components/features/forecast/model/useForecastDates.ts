import { format } from 'date-fns'
import { useLocale } from 'next-intl'

import { getDateFnsLocale } from '@/lib/dateFnsLocale'

// Georgia is UTC+4 all year (no daylight saving)
const tbilisiOffsetMs = 4 * 60 * 60 * 1000

// A local Date showing the wall-clock time in Georgia. Forecast times are
// Georgian local times for every reader — and a fixed zone renders the same on
// the server and in the browser. (`Intl` can't do this: browsers lack Georgian
// date formatting, the server has it, and the two would disagree.)
const toTbilisiWallTime = (value: Date | string) => {
  const shifted = new Date(new Date(value).getTime() + tbilisiOffsetMs)

  return new Date(
    shifted.getUTCFullYear(),
    shifted.getUTCMonth(),
    shifted.getUTCDate(),
    shifted.getUTCHours(),
    shifted.getUTCMinutes(),
  )
}

const useForecastDates = () => {
  const locale = getDateFnsLocale(useLocale())
  const formatAs = (pattern: string) => (value: Date | string) =>
    format(toTbilisiWallTime(value), pattern, { locale })

  // Position of a time within its day, 0 (00:00) → 1 (24:00)
  const getDayFraction = (value: Date | string) => {
    const wallTime = toTbilisiWallTime(value)

    return (wallTime.getHours() * 60 + wallTime.getMinutes()) / (24 * 60)
  }

  return {
    // "15 Apr 2026"
    formatDate: formatAs('d MMM yyyy'),
    // "Wed 15 Apr"
    formatDay: formatAs('EEE d MMM'),
    // "07:37"
    formatTime: formatAs('HH:mm'),
    getDayFraction,
  }
}

export default useForecastDates
