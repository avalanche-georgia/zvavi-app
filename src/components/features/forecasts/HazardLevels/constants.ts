import type { ElevationZone, HazardLevelScale } from '@domain/types'

export const hazardScaleValues: HazardLevelScale[] = ['0', '1', '2', '3', '4', '5']

export const elevationZones: ElevationZone[] = ['highAlpine', 'alpine', 'subAlpine']

// Yellow and lighter need ink text; the dark end needs white
export const isDarkHazard = (level: HazardLevelScale) => level === '4' || level === '5'
