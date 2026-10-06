import { endOfDay, startOfDay } from 'date-fns'

import { avalancheSeason } from './constants'

// The current avalanche season, 1 Nov – 31 May. Between seasons (June–October)
// it's the one that just ended.
export const getSeasonRange = (today: Date): { end: Date; start: Date } => {
  const { end, start } = avalancheSeason
  const startYear = today.getMonth() >= start.month ? today.getFullYear() : today.getFullYear() - 1

  return {
    end: endOfDay(new Date(startYear + 1, end.month, end.day)),
    start: startOfDay(new Date(startYear, start.month, start.day)),
  }
}

const shortYear = (year: number) => String(year % 100).padStart(2, '0')

// "25/26"
export const getSeasonLabel = (today: Date) => {
  const startYear = getSeasonRange(today).start.getFullYear()

  return `${shortYear(startYear)}/${shortYear(startYear + 1)}`
}
