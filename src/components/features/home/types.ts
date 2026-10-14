import type { RegionForecastState } from '@domain/forecastState'
import type { HazardLevelScale, Region, RegionId } from '@domain/types'

// What the chooser's list and map need about a region — no full forecast
export type HeroRegion = {
  forecastZone: Region['forecastZone']
  id: RegionId
  // null without a published forecast
  issuedAt: string | null
  level: HazardLevelScale | null
  state: RegionForecastState
  validUntil: string | null
}
