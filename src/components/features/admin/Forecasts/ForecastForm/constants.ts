import type { Avalanche, ForecastFormData } from '@domain/types'

import type { ProblemFormData } from './ProblemsSection/ProblemForm'

export const defaultFormData: ForecastFormData = {
  baseFormData: {
    additionalHazards: '',
    forecaster: '',
    hazardLevels: {
      alpine: '1',
      highAlpine: '1',
      overall: '1',
      subAlpine: '1',
    },
    snowpack: '',
    summary: '',
    validUntil: null,
    weather: '',
  },
  forecastDetails: {
    avalancheProblems: [],
    recentAvalanches: [],
  },
}

export const initialProblemData: ProblemFormData = {
  aspects: {
    alpine: [],
    highAlpine: [],
    subAlpine: [],
  },
  avalancheSize: 1,
  confidence: 'low',
  description: '',
  distribution: 'isolated',
  isAllDay: true,
  order: 0,
  sensitivity: 'reactive',
  timeOfDay: { end: null, start: null },
  trend: 'deteriorating',
  type: undefined,
}

export const initialAvalancheData: Avalanche = {
  aspects: {
    alpine: [],
    highAlpine: [],
    subAlpine: [],
  },
  date: null,
  description: '',
  involvement: '',
  isDateUnknown: false,
  latitude: null,
  location: '',
  longitude: null,
  quantity: 1,
  size: 1,
  slabDepth: null,
  trigger: null,
  type: null,
  width: null,
}
