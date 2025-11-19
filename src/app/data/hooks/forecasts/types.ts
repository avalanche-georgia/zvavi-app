import type { Forecast, ForecastDetails, HazardLevels } from '@/business/types'

type ForecastBaseData = {
  id?: Forecast['id']
  additionalHazards: string
  forecaster: string
  hazardLevels: HazardLevels
  snowpack: string
  summary: string
  validUntil: string | null
  weather: string
}

export type ForecastFormPayload = {
  forecast: ForecastBaseData
} & ForecastDetails

export type ForecastQueryVariables = { forecastId: Forecast['id'] }

export type ForecastStatusToggleVariables = {
  forecastId: Forecast['id']
  status: Forecast['status']
}

export type CurrentForecastQueryVariables = {
  isShort: boolean
}

export type ForecastsQueryVariables = { status: Forecast['status'] }
