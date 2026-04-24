import type { Aspect, HazardLevel, HazardLevelScale } from './types'

export const hazardLevelNames: Record<HazardLevel, string> = {
  considerable: 'forecast.hazardLevels.considerable',
  extreme: 'forecast.hazardLevels.extreme',
  high: 'forecast.hazardLevels.high',
  low: 'forecast.hazardLevels.low',
  moderate: 'forecast.hazardLevels.moderate',
  noRating: 'forecast.hazardLevels.noRating',
}

export const hazardLevelNamesByScale: Record<HazardLevelScale, string> = {
  0: hazardLevelNames.noRating,
  1: hazardLevelNames.low,
  2: hazardLevelNames.moderate,
  3: hazardLevelNames.considerable,
  4: hazardLevelNames.high,
  5: hazardLevelNames.extreme,
}

export const avalancheTypes = {
  cornice: 'cornice',
  deepSlab: 'deepSlab',
  glide: 'glide',
  looseDry: 'looseDry',
  looseWet: 'looseWet',
  persistentSlab: 'persistentSlab',
  stormSlab: 'stormSlab',
  wetSlab: 'wetSlab',
  windSlab: 'windSlab',
} as const

export const avalancheProblemTypes = avalancheTypes

export const avalancheTriggers = {
  explosives: 'explosives',
  natural: 'natural',
  riderAccidental: 'riderAccidental',
  riderCut: 'riderCut',
  unknown: 'unknown',
  vehicle: 'vehicle',
} as const

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
} as const

export const trends = {
  deteriorating: 'deteriorating',
  improving: 'improving',
  noChange: 'noChange',
} as const

export const confidenceLevels = {
  high: 'high',
  low: 'low',
  moderate: 'moderate',
} as const

export const dateFormat = 'dd MMM yyyy'
export const timeFormat = 'HH:mm'
export const dateTimeFormat = 'dd.MM.yyyy HH:mm'
export const serverDateFormat = 'yyyy-MM-dd'

export const memberStatuses = {
  active: 'active',
  expired: 'expired',
  inactive: 'inactive',
  suspended: 'suspended',
} as const
