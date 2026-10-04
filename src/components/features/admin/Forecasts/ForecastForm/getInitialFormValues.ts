import type { AdminForecast } from '@domain/types'

import type { ForecastFormSchema } from './schema'

const toDate = (value: Date | string | null) => (value ? new Date(value) : null)

export const emptyFormValues: ForecastFormSchema = {
  additionalHazards: '',
  avalancheProblems: [],
  forecaster: '',
  hazardLevels: { alpine: '1', highAlpine: '1', overall: '1', subAlpine: '1' },
  recentAvalancheIds: [],
  snowpack: '',
  summary: '',
  validUntil: null,
  weather: '',
}

// Form values from a saved forecast (edit, or the source of a duplicate)
const getInitialFormValues = (forecast: AdminForecast | null): ForecastFormSchema => {
  if (!forecast) return emptyFormValues

  return {
    additionalHazards: forecast.additionalHazards ?? '',
    avalancheProblems: forecast.avalancheProblems.map((problem) => ({
      ...problem,
      description: problem.description ?? '',
      id: problem.id != null ? String(problem.id) : undefined,
      timeOfDay: { end: toDate(problem.timeOfDay.end), start: toDate(problem.timeOfDay.start) },
    })),
    forecaster: forecast.forecaster ?? '',
    hazardLevels: forecast.hazardLevels,
    recentAvalancheIds: forecast.recentAvalancheIds,
    snowpack: forecast.snowpack ?? '',
    summary: forecast.summary ?? '',
    validUntil: toDate(forecast.validUntil),
    weather: forecast.weather ?? '',
  }
}

export default getInitialFormValues
