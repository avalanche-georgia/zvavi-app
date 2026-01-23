import type { ForecastFormData } from '@domain/types'

import type { ForecastFormSchema } from './schema'

const toDate = (value: Date | string | null): Date | null => {
  if (!value) return null
  if (value instanceof Date) return value

  return new Date(value)
}

const convertToFormSchema = (data: ForecastFormData): ForecastFormSchema => ({
  additionalHazards: data.baseFormData.additionalHazards,
  avalancheProblems: data.forecastDetails.avalancheProblems.map((problem) => ({
    ...problem,
    id: problem.id != null ? String(problem.id) : undefined,
    timeOfDay: {
      end: toDate(problem.timeOfDay.end),
      start: toDate(problem.timeOfDay.start),
    },
  })),
  forecaster: data.baseFormData.forecaster,
  hazardLevels: data.baseFormData.hazardLevels,
  recentAvalanches: data.forecastDetails.recentAvalanches.map((avalanche) => ({
    ...avalanche,
    date: toDate(avalanche.date),
    id: avalanche.id != null ? String(avalanche.id) : undefined,
  })),
  snowpack: data.baseFormData.snowpack,
  summary: data.baseFormData.summary,
  validUntil: data.baseFormData.validUntil,
  weather: data.baseFormData.weather,
})

export default convertToFormSchema
