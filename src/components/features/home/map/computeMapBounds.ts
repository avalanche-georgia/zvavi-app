import type { FeatureCollection } from 'geojson'
import { geoJSON, type LatLngBounds } from 'leaflet'

import type { HeroRegion } from '../types'

// All forecast zones together; null when no region has one
export const computeBounds = (regions: HeroRegion[]): LatLngBounds | null =>
  regions.reduce<LatLngBounds | null>((bounds, region) => {
    if (!region.forecastZone) return bounds

    const zoneBounds = geoJSON(region.forecastZone as FeatureCollection).getBounds()

    return bounds ? bounds.extend(zoneBounds) : zoneBounds
  }, null)
