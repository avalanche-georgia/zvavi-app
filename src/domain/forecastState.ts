import { isBefore } from 'date-fns'

import type { Forecast } from './types'

import { tbilisiOffsetMs } from '@/lib/tbilisiTime'

// noForecaster: the region has never had a published forecast (season doesn't matter).
// offSeason: June–November with no rated forecast — forecasting resumes in December.
// noRating: the latest is "No rating" in season. expired: its window has passed and no
// new one was issued. current: a rated forecast is in force.
export type RegionForecastState = 'current' | 'expired' | 'noForecaster' | 'noRating' | 'offSeason'

// June (5) → November (10), Georgian time
const offSeasonMonths = [5, 6, 7, 8, 9, 10]

const isOffSeasonMonth = (now: Date) =>
  offSeasonMonths.includes(new Date(now.getTime() + tbilisiOffsetMs).getUTCMonth())

// The region's state from its latest published forecast (null: none ever published)
export const getForecastState = (forecast: Forecast | null, now: Date): RegionForecastState => {
  if (!forecast) return 'noForecaster'

  const isRated = forecast.hazardLevels.overall !== '0'

  if (!isRated) return isOffSeasonMonth(now) ? 'offSeason' : 'noRating'

  return isBefore(forecast.validUntil, now) ? 'expired' : 'current'
}
