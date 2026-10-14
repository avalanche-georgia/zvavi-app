import type { Forecast, Region } from '@domain/types'

import type { HeroRegion, RegionForecastState } from './types'

export type HomeRegion = {
  // null: the region has no published forecast
  forecast: Forecast | null
  region: Region
  state: RegionForecastState
}

// Only what the hero's list and map need — keeps full forecasts out of the client bundle data
const toHeroRegion = ({ forecast, region, state }: HomeRegion): HeroRegion => ({
  forecastZone: region.forecastZone,
  id: region.id,
  issuedAt: forecast ? (forecast.publishedAt ?? forecast.createdAt) : null,
  level: forecast?.hazardLevels.overall ?? null,
  state,
  validUntil: forecast?.validUntil ?? null,
})

export default toHeroRegion
