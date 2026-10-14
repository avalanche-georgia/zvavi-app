import type { Forecast, Region } from '@domain/types'

import type { ChooserRegionState, HeroRegion } from './types'

export type RegionsPageRegion = {
  // null: the region has no published forecast
  forecast: Forecast | null
  region: Region
  state: ChooserRegionState
}

// Only what the list and map need — keeps full forecasts out of the client props
const toHeroRegion = ({ forecast, region, state }: RegionsPageRegion): HeroRegion => ({
  forecastZone: region.forecastZone,
  id: region.id,
  issuedAt: forecast ? (forecast.publishedAt ?? forecast.createdAt) : null,
  level: forecast?.hazardLevels.overall ?? null,
  state,
  validUntil: forecast?.validUntil ?? null,
})

export default toHeroRegion
