import type {
  aspects,
  avalancheProblemTypes,
  confidenceLevels,
  distributionTypes,
  sensitivityLevels,
  trends,
} from '@domain/constants'

export type HazardLevel = 'low' | 'moderate' | 'considerable' | 'high' | 'extreme'

export type HazardLevelScale = '1' | '2' | '3' | '4' | '5'
export type ElevationZone = 'highAlpine' | 'alpine' | 'subAlpine'
export type TimeRange = { start: Date | string | null; end: Date | string | null }

export type User = {
  id: string
  email: string
}

export type AvalancheSize = 1 | 2 | 3 | 4 | 5
export type AvalancheProblemTypes = keyof typeof avalancheProblemTypes
export type Confidence = keyof typeof confidenceLevels
export type Distribution = keyof typeof distributionTypes
export type Sensitivity = keyof typeof sensitivityLevels
export type Trend = keyof typeof trends
export type Aspect = keyof typeof aspects
export type ElevationKey = ElevationZone | 'overall'
export type HazardLevels = Record<ElevationKey, HazardLevelScale>
export type Aspects = Record<ElevationZone, Aspect[]>

export type Forecast = {
  additionalHazards: string
  createdAt: string
  forecaster: string
  hazardLevels: HazardLevels
  id: number
  publishedAt: string | null
  snowpack: string
  status: 'draft' | 'published'
  summary: string
  validUntil: string
  weather: string
}

export type Problem = {
  id?: string
  aspects: Aspects
  avalancheSize: AvalancheSize
  confidence: Confidence
  createdAt?: string
  description: string
  distribution: Distribution
  isAllDay: boolean
  sensitivity: Sensitivity
  timeOfDay: TimeRange
  trend: Trend
  type: AvalancheProblemTypes
}

export type Avalanche = {
  id?: string
  aspects: Aspects
  createdAt?: string
  date: Date | null
  description: string
  size: AvalancheSize
}

export type ForecastDetails = {
  avalancheProblems: Problem[]
  recentAvalanches: Avalanche[]
}

export type BaseFormData = {
  id?: number
  additionalHazards: string
  forecaster: string
  hazardLevels: HazardLevels
  snowpack: string
  summary: string
  validUntil: Date | null
  weather: string
}

export type ForecastFormData = {
  baseFormData: BaseFormData
  forecastDetails: ForecastDetails
}

export type FullForecast = Forecast & ForecastDetails
