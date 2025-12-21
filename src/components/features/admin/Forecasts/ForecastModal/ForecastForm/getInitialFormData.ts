import type { ForecastFormData, FullForecast } from '@domain/types'

import { defaultFormData } from './constants'

const getInitialFormData = (forecast: FullForecast | null): ForecastFormData => {
  if (!forecast) return defaultFormData

  return {
    baseFormData: {
      additionalHazards: forecast.additionalHazards,
      forecaster: forecast.forecaster,
      hazardLevels: forecast.hazardLevels,
      id: forecast.id,
      snowpack: forecast.snowpack,
      summary: forecast.summary,
      validUntil: forecast.validUntil ? new Date(forecast.validUntil) : null,
      weather: forecast.weather,
    },
    forecastDetails: {
      avalancheProblems: forecast.avalancheProblems,
      recentAvalanches: forecast.recentAvalanches,
    },
  }
}

export default getInitialFormData
