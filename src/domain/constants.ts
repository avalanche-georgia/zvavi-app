import type { Aspect, HazardLevel, HazardLevelScale } from './types'

export const hazardLevelNames: Record<HazardLevel, string> = {
  considerable: 'forecast.hazardLevels.considerable',
  extreme: 'forecast.hazardLevels.extreme',
  high: 'forecast.hazardLevels.high',
  low: 'forecast.hazardLevels.low',
  moderate: 'forecast.hazardLevels.moderate',
}

export const hazardLevelNamesByScale: Record<HazardLevelScale, string> = {
  1: hazardLevelNames.low,
  2: hazardLevelNames.moderate,
  3: hazardLevelNames.considerable,
  4: hazardLevelNames.high,
  5: hazardLevelNames.extreme,
}

export const avalancheProblemTypes = {
  cornice: 'cornice',
  deepSlab: 'deepSlab',
  glide: 'glide',
  looseDry: 'looseDry',
  looseWet: 'looseWet',
  persistentSlab: 'persistentSlab',
  stormSlab: 'stormSlab',
  wetSlab: 'wetSlab',
  windSlab: 'windSlab',
}

export const aspects = {
  e: 'E',
  n: 'N',
  ne: 'NE',
  nw: 'NW',
  s: 'S',
  se: 'SE',
  sw: 'SW',
  w: 'W',
} as const

export const sortedAspects: Aspect[] = ['n', 'ne', 'e', 'se', 's', 'sw', 'w', 'nw']

export const sensitivityLevels = {
  reactive: 'reactive',
  stubborn: 'stubborn',
  touchy: 'touchy',
  unreactive: 'unreactive',
} as const

export const sensitivityLevelsSorted = [
  sensitivityLevels.unreactive,
  sensitivityLevels.stubborn,
  sensitivityLevels.reactive,
  sensitivityLevels.touchy,
]

export const distributionTypes = {
  isolated: 'isolated',
  specific: 'specific',
  widespread: 'widespread',
}

export const trends = {
  deteriorating: 'deteriorating',
  improving: 'improving',
  noChange: 'noChange',
}

export const confidenceLevels = {
  high: 'high',
  low: 'low',
  moderate: 'moderate',
}

export const dateFormat = 'dd MMM yyyy'
export const timeFormat = 'HH:mm'
