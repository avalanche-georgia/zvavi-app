import { endOfDay, startOfDay } from 'date-fns'

import { avalancheSeason } from './constants'

import { fromTbilisiWallClock, toTbilisiWallClock } from '@/lib/tbilisiTime'

// The season a calendar month belongs to, as its start year. A season runs
// 1 Nov – 31 May; between seasons (June–October) it's the one that just ended.
// Month is 0-based (Date convention).
export const getSeasonStartYear = (year: number, month: number) =>
  month >= avalancheSeason.start.month ? year : year - 1

// True for Nov–May, false between seasons. Month is 0-based.
export const isSeasonMonth = (month: number) =>
  month >= avalancheSeason.start.month || month <= avalancheSeason.end.month

// The season a moment falls in, by Georgia's calendar (seasons are Georgian)
const getSeasonStartYearAt = (moment: Date) => {
  const wallClock = toTbilisiWallClock(moment)

  return getSeasonStartYear(wallClock.getFullYear(), wallClock.getMonth())
}

// The season `now` falls in, from its first to its last moment in Georgia
export const getSeasonRange = (now: Date): { end: Date; start: Date } => {
  const { end, start } = avalancheSeason
  const startYear = getSeasonStartYearAt(now)

  return {
    end: fromTbilisiWallClock(endOfDay(new Date(startYear + 1, end.month, end.day))),
    start: fromTbilisiWallClock(startOfDay(new Date(startYear, start.month, start.day))),
  }
}

// "2025–26"
export const formatSeasonLabel = (startYear: number) =>
  `${startYear}–${String((startYear + 1) % 100).padStart(2, '0')}`

export const getSeasonLabel = (now: Date) => formatSeasonLabel(getSeasonStartYearAt(now))
