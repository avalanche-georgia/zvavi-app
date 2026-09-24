'use client'

import { useEffect } from 'react'
import type { Region } from '@domain/types'
import type { FeatureCollection } from 'geojson'
import type { LatLngBounds, PathOptions } from 'leaflet'
import { GeoJSON, useMap } from 'react-leaflet'

const zoneStyle: PathOptions = {
  color: '#dc2626',
  fillOpacity: 0.05,
  interactive: false,
  weight: 1.5,
}

type RegionBoundaryProps = {
  // Zoom-out limit — Leaflet's maxBounds alone only restricts panning
  bounds: LatLngBounds | null
  region: Region
}

// Forecast zone outline + zoom-out limit. Render inside a MapContainer that
// also gets `maxBounds={bounds}` for the pan limit.
const RegionBoundary = ({ bounds, region }: RegionBoundaryProps) => {
  const map = useMap()
  const zone = region.forecastZone as FeatureCollection | null

  useEffect(() => {
    if (!bounds) return undefined

    // Depends on the container size — recalculated whenever the map resizes
    const updateMinZoom = () => map.setMinZoom(map.getBoundsZoom(bounds))

    updateMinZoom()
    map.on('resize', updateMinZoom)

    return () => {
      map.off('resize', updateMinZoom)
    }
  }, [map, bounds])

  if (!zone?.features.length) return null

  return <GeoJSON data={zone} style={zoneStyle} />
}

export default RegionBoundary
