import { endOfDay, startOfDay } from 'date-fns'

import { avalancheSeason } from './constants'

// The season a calendar month belongs to, as its start year. A season runs
// 1 Nov – 31 May; between seasons (June–October) it's the one that just ended.
// Month is 0-based (Date convention).
export const getSeasonStartYear = (year: number, month: number) =>
  month >= avalancheSeason.start.month ? year : year - 1

// True for Nov–May, false between seasons. Month is 0-based.
export const isSeasonMonth = (month: number) =>
  month >= avalancheSeason.start.month || month <= avalancheSeason.end.month

// The current avalanche season
export const getSeasonRange = (today: Date): { end: Date; start: Date } => {
  const { end, start } = avalancheSeason
  const startYear = getSeasonStartYear(today.getFullYear(), today.getMonth())

  return {
    end: endOfDay(new Date(startYear + 1, end.month, end.day)),
    start: startOfDay(new Date(startYear, start.month, start.day)),
  }
}

// "2025–26"
export const formatSeasonLabel = (startYear: number) =>
  `${startYear}–${String((startYear + 1) % 100).padStart(2, '0')}`

export const getSeasonLabel = (today: Date) =>
  formatSeasonLabel(getSeasonStartYear(today.getFullYear(), today.getMonth()))
