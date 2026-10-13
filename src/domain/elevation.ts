import type { ElevationZone, Region } from './types'

// Where Alpine starts and ends, in metres. Regions without their own
// thresholds use the values the site has always shown.
const defaultThresholds = { high: 2600, low: 2000 }

// The region's own thresholds, once its row carries them
type ThresholdSource = Pick<Region, 'id'> & {
  elevationHighM?: number | null
  elevationLowM?: number | null
}

export type ElevationThresholds = { high: number; low: number }

export const getElevationThresholds = (region?: ThresholdSource | null): ElevationThresholds => ({
  high: region?.elevationHighM ?? defaultThresholds.high,
  low: region?.elevationLowM ?? defaultThresholds.low,
})

export type ElevationRange =
  | { kind: 'above'; value: number }
  | { high: number; kind: 'between'; low: number }
  | { kind: 'below'; value: number }

export const getElevationRange = (
  zone: ElevationZone,
  { high, low }: ElevationThresholds,
): ElevationRange => {
  if (zone === 'highAlpine') return { kind: 'above', value: high }
  if (zone === 'subAlpine') return { kind: 'below', value: low }

  return { high, kind: 'between', low }
}
