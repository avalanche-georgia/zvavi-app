import type {
  Aspect,
  AvalancheType,
  Confidence,
  Distribution,
  ElevationZone,
  HazardLevelScale,
  Sensitivity,
  Trend,
} from '@domain/types'

import { noSnowRating } from './config'
import type {
  CaamlAspect,
  CaamlDangerRatingValue,
  CaamlFrequency,
  CaamlProblemType,
  CaamlSnowpackStability,
} from './types'

// Exhaustive by construction: adding a value to one of our enums without a
// mapping here is a compile error. The keys also drive input validation.

export const bandsTopDown: ElevationZone[] = ['highAlpine', 'alpine', 'subAlpine']

// EAWS has no "extreme": our level 5 is `very_high`
export const hazardLevelToDangerRating: Record<HazardLevelScale, CaamlDangerRatingValue> = {
  0: noSnowRating,
  1: 'low',
  2: 'moderate',
  3: 'considerable',
  4: 'high',
  5: 'very_high',
}

export const avalancheTypeToProblemType: Record<AvalancheType, CaamlProblemType> = {
  cornice: 'cornices',
  deepSlab: 'persistent_weak_layers',
  glide: 'gliding_snow',
  looseDry: 'new_snow',
  looseWet: 'wet_snow',
  persistentSlab: 'persistent_weak_layers',
  stormSlab: 'new_snow',
  wetSlab: 'wet_snow',
  windSlab: 'wind_slab',
}

export const sensitivityToSnowpackStability: Record<Sensitivity, CaamlSnowpackStability> = {
  reactive: 'poor',
  stubborn: 'fair',
  touchy: 'very_poor',
  unreactive: 'good',
}

export const distributionToFrequency: Record<Distribution, CaamlFrequency> = {
  isolated: 'few',
  specific: 'some',
  widespread: 'many',
}

export const aspectToCaaml: Record<Aspect, CaamlAspect> = {
  e: 'E',
  n: 'N',
  ne: 'NE',
  nw: 'NW',
  s: 'S',
  se: 'SE',
  sw: 'SW',
  w: 'W',
}

// Canonical clockwise order, starting at north
export const aspectsClockwise: Aspect[] = ['n', 'ne', 'e', 'se', 's', 'sw', 'w', 'nw']

// Passed through to customData as-is; listed so input validation stays exhaustive
export const confidenceValues: Record<Confidence, Confidence> = {
  high: 'high',
  low: 'low',
  moderate: 'moderate',
}

export const trendValues: Record<Trend, Trend> = {
  deteriorating: 'deteriorating',
  improving: 'improving',
  noChange: 'noChange',
}
