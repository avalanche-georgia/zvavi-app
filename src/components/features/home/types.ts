import type { HazardLevelScale, Region, RegionId } from '@domain/types'

// current: a rated forecast is in force. expired: its window has passed, no new one issued.
// noRating: the latest is "No rating" in season. none: nothing published.
// offSeason: June–November with no rated forecast — forecasting resumes in December.
export type RegionForecastState = 'current' | 'expired' | 'noRating' | 'none' | 'offSeason'

// What the hero's list and map need about a region — no full forecast
export type HeroRegion = {
  forecastZone: Region['forecastZone']
  id: RegionId
  // null without a published forecast
  issuedAt: string | null
  level: HazardLevelScale | null
  state: RegionForecastState
  validUntil: string | null
}
