import { useMemo } from 'react'
import type { Region } from '@domain/types'
import type { FeatureCollection } from 'geojson'
import { geoJSON, type LatLngBounds } from 'leaflet'

// Forecast zone bounds grown by `padding` (0.2 = 20% each way) — drives a
// map's initial view, pan limit and zoom-out limit. null without a zone.
const useRegionBounds = (region: Region, padding: number): LatLngBounds | null =>
  useMemo(() => {
    if (!region.forecastZone) return null

    return geoJSON(region.forecastZone as FeatureCollection)
      .getBounds()
      .pad(padding)
  }, [region.forecastZone, padding])

export default useRegionBounds
