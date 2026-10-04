import type { Forecast, HazardLevels, Problem, RegionId } from '@domain/types'

type ForecastSaveFields = {
  // Absent: create a new forecast
  id?: Forecast['id']
  additionalHazards: string
  forecaster: string
  hazardLevels: HazardLevels
  regionId: RegionId
  snowpack: string
  summary: string
  validUntil: string
  weather: string
}

// What save_forecast takes: the forecast, its problems in priority order, and
// the IDs of the linked records
export type ForecastSavePayload = {
  avalancheProblems: Omit<Problem, 'createdAt' | 'id' | 'order'>[]
  forecast: ForecastSaveFields
  recentAvalancheIds: number[]
}

export type ForecastQueryVariables = { forecastId: Forecast['id'] }

export type ForecastStatusToggleVariables = {
  forecastId: Forecast['id']
  regionId: RegionId
  status: Forecast['status']
}

export type CurrentForecastQueryVariables = {
  isShort: boolean
}
