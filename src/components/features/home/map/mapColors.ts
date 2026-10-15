import type { HazardLevelScale } from '@domain/types'
import type { PathOptions } from 'leaflet'

// Leaflet paths take colours, not classes — the same values as the hazard-* tokens
const hazardHexColors: Record<HazardLevelScale, string> = {
  '0': '#d0d5de',
  '1': '#6ac828',
  '2': '#f8f024',
  '3': '#f88f2c',
  '4': '#eb450b',
  '5': '#1b1a1e',
}

// A rated zone in its level's colour; anything else grey and dashed
export const getZoneStyle = (
  level: HazardLevelScale | null,
  isHighlighted: boolean,
): PathOptions => {
  if (!level) {
    return {
      color: '#8a8f99',
      dashArray: '5 5',
      fillColor: hazardHexColors['0'],
      fillOpacity: isHighlighted ? 0.75 : 0.35,
      weight: isHighlighted ? 4 : 2.5,
    }
  }

  return {
    color: hazardHexColors[level],
    dashArray: undefined,
    fillColor: hazardHexColors[level],
    fillOpacity: isHighlighted ? 0.75 : 0.5,
    weight: isHighlighted ? 4 : 2.5,
  }
}
