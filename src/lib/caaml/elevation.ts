import type { ElevationZone } from '@domain/types'

import { InvalidForecastError } from './errors'
import type { CaamlElevation } from './types'

export type ElevationThresholds = { high: number; low: number }

type BandBounds = { lower?: number; upper?: number }

const boundsOf = (band: ElevationZone, { high, low }: ElevationThresholds): BandBounds => {
  const bounds: Record<ElevationZone, BandBounds> = {
    alpine: { lower: low, upper: high },
    highAlpine: { lower: high },
    subAlpine: { upper: low },
  }

  return bounds[band]
}

// Mirrors the DB CHECK on regions: positive, low < high, 100 m resolution
// (the CAAML schema's elevation regex doesn't enforce it)
export const assertValidThresholds = ({ high, low }: ElevationThresholds) => {
  const isValid =
    Number.isInteger(low) &&
    Number.isInteger(high) &&
    low > 0 &&
    low < high &&
    low % 100 === 0 &&
    high % 100 === 0

  if (!isValid) throw new InvalidForecastError('region elevation thresholds are invalid')
}

// Elevation range of a run of adjacent bands (ordered top → bottom). Returns
// undefined when the run covers every band, i.e. there is no bound at all.
export const elevationForBands = (
  bands: ElevationZone[],
  thresholds: ElevationThresholds,
): CaamlElevation | undefined => {
  const { upper } = boundsOf(bands[0], thresholds)
  const { lower } = boundsOf(bands[bands.length - 1], thresholds)
  const elevation: CaamlElevation = {}

  if (lower !== undefined) elevation.lowerBound = String(lower)
  if (upper !== undefined) elevation.upperBound = String(upper)

  return Object.keys(elevation).length ? elevation : undefined
}

export const elevationForBand = (band: ElevationZone, thresholds: ElevationThresholds) =>
  elevationForBands([band], thresholds) ?? {}
