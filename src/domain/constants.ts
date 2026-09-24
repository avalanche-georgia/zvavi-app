import type {
  Aspect,
  AvalancheSource,
  AvalancheStatus,
  AvalancheTrigger,
  AvalancheType,
  ElevationZone,
  HazardLevel,
  HazardLevelScale,
  MemberStatus,
} from './types'

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

export const avalancheTypesOrdered: (AvalancheType | 'unknown')[] = [
  'unknown',
  'cornice',
  'deepSlab',
  'glide',
  'looseDry',
  'looseWet',
  'persistentSlab',
  'stormSlab',
  'wetSlab',
  'windSlab',
]

export const avalancheSources: Record<AvalancheSource, AvalancheSource> = {
  external: 'external',
  team: 'team',
}

export const avalancheStatuses: Record<AvalancheStatus, AvalancheStatus> = {
  archived: 'archived',
  draft: 'draft',
  pending: 'pending',
  published: 'published',
}

// One set of field rules for every avalanche form: the public submit form, the
// admin form and the submit API (authoritative). Out-of-range numbers are
// rejected, not clamped.
export const avalancheFieldLimits = {
  descriptionMaxLength: 2000,
  involvementMaxLength: 2000,
  latitude: { max: 90, min: -90 },
  locationMaxLength: 200,
  longitude: { max: 180, min: -180 },
  quantity: { max: 5, min: 1 },
  slabDepth: { max: 1000, min: 0 },
  width: { max: 500, min: 0 },
} as const

// Shared by the public submit form (client-side checks) and the upload-url
// route (authoritative server-side checks — client compression is bypassable).
export const observationPhotoLimits = {
  maxCount: 3,
  maxSizeBytes: 15 * 1024 * 1024,
}

// What may be uploaded — HEIC is accepted from the picker but always converted
// to JPEG client-side first, so it's never stored.
export const observationPhotoContentTypes = ['image/jpeg', 'image/png'] as const

export const avalancheTriggers = {
  explosives: 'explosives',
  natural: 'natural',
  riderAccidental: 'riderAccidental',
  riderCut: 'riderCut',
  unknown: 'unknown',
  vehicle: 'vehicle',
} as const

export const avalancheTriggersOrdered: AvalancheTrigger[] = [
  'unknown',
  'explosives',
  'natural',
  'riderAccidental',
  'riderCut',
  'vehicle',
]

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

// Avalanche season, 1 Nov – 31 May. Months are 0-based (Date convention).
export const avalancheSeason = {
  end: { day: 31, month: 4 },
  start: { day: 1, month: 10 },
}

// Top → bottom
export const sortedElevationZones: ElevationZone[] = ['highAlpine', 'alpine', 'subAlpine']

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

export const shortDateFormat = 'dd MMM'
export const dateFormat = 'dd MMM yyyy'
export const timeFormat = 'HH:mm'
export const dateTimeFormat = 'dd.MM.yyyy HH:mm'
export const serverDateFormat = 'yyyy-MM-dd'

export const memberStatuses: Record<MemberStatus, MemberStatus> = {
  active: 'active',
  expired: 'expired',
  inactive: 'inactive',
  pending: 'pending',
  suspended: 'suspended',
}

export const regionIds = {
  gudauri: 'gudauri',
} as const

export const userRoles = {
  admin: 'admin',
  forecaster: 'forecaster',
  trainee: 'trainee',
} as const

// UI/UX fallback for public read queries only. Never use in data mutations.
export const defaultRegionId = 'gudauri'
export const regionLocalStorageKey = 'zvavi.region'
