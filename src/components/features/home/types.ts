import type { RegionForecastState } from '@domain/forecastState'
import type { HazardLevelScale, Region, RegionId } from '@domain/types'

// unavailable: the forecast lookup failed — say nothing about the region's state
export type ChooserRegionState = RegionForecastState | 'unavailable'

// What the chooser's list and map need about a region — no full forecast
export type HeroRegion = {
  forecastZone: Region['forecastZone']
  id: RegionId
  // null without a published forecast
  issuedAt: string | null
  level: HazardLevelScale | null
  state: ChooserRegionState
  validUntil: string | null
}
