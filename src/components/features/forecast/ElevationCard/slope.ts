import { sortedElevationZones } from '@domain/constants'
import type { ElevationZone } from '@domain/types'

// The mountain on the public page: a right-angled triangle — one straight
// slope on the left, a vertical right edge — cut into three slices. Fixed
// sizes, in px: the two lower slices are equal, the top one a little taller.
export const sliceHeights: Record<ElevationZone, number> = {
  alpine: 68,
  highAlpine: 84,
  subAlpine: 68,
}

export const sliceGap = 4
export const slopeWidth = 132

// The summit is cut flat this wide, so the top slice isn't a needle point
const summitWidth = 14

const totalHeight =
  sortedElevationZones.reduce((sum, zone) => sum + sliceHeights[zone], 0) +
  sliceGap * (sortedElevationZones.length - 1)

// Where the slope is, from the left, at a height measured from the summit
const getSlopeX = (y: number) => (slopeWidth - summitWidth) * (1 - y / totalHeight)

// The slice's outline: its stretch of the slope, then straight edges
export const getSliceClipPath = (zone: ElevationZone) => {
  const index = sortedElevationZones.indexOf(zone)
  const top = sortedElevationZones
    .slice(0, index)
    .reduce((sum, above) => sum + sliceHeights[above] + sliceGap, 0)
  const bottom = top + sliceHeights[zone]

  return `polygon(${getSlopeX(top).toFixed(1)}px 0, 100% 0, 100% 100%, ${getSlopeX(bottom).toFixed(1)}px 100%)`
}
