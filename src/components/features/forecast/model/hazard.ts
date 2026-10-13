import type { HazardLevelScale } from '@domain/types'

// The rated levels, low → extreme (0 is "no rating")
export const hazardScaleLevels: HazardLevelScale[] = ['1', '2', '3', '4', '5']

// Only the black "extreme" tile needs white text — level 4 keeps ink text on
// the public page (forecasters' request)
export const hazardTextClass = (level: HazardLevelScale) =>
  level === '5' ? 'text-white' : 'text-ink'
