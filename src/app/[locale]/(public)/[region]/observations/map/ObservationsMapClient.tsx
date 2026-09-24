'use client'

import { RegionBoundary, topoMaxZoom, TopoTileLayer, useRegionBounds } from '@components/shared/map'
import type { ObservationPoint, Region } from '@domain/types'
import { MapContainer, ZoomControl } from 'react-leaflet'

import MapBehavior from './MapBehavior'
import { fallbackCenter, fallbackZoom } from './mapConfig'
import ObservationMarker from './ObservationMarker'

import 'leaflet/dist/leaflet.css'

const detailPanelOffset = (480 + 16) / 2

export type ObservationsMapClientProps = {
  focus: [number, number] | null
  // Every observation matching the filter, not just the loaded list pages
  points: ObservationPoint[]
  onMapClick: VoidFunction
  onMarkerClick: (id: number) => void
  region: Region
  selectedId: number | null
}

const ObservationsMapClient = ({
  focus,
  onMapClick,
  onMarkerClick,
  points,
  region,
  selectedId,
}: ObservationsMapClientProps) => {
  // Opens on the forecast zone; panning and zooming out stop at "region + 30%"
  const bounds = useRegionBounds(region, 0.3)
  const center: [number, number] = region.mapCenter
    ? [region.mapCenter.lat, region.mapCenter.lng]
    : fallbackCenter

  return (
    <MapContainer
      bounds={bounds ?? undefined}
      center={bounds ? undefined : center}
      className="bg-map size-full"
      maxBounds={bounds ?? undefined}
      maxBoundsViscosity={1}
      maxZoom={topoMaxZoom}
      zoom={bounds ? undefined : (region.defaultZoom ?? fallbackZoom)}
      zoomControl={false}
    >
      <TopoTileLayer />
      <ZoomControl position="bottomleft" />
      <RegionBoundary bounds={bounds} region={region} />
      {/* Keeps the focused marker clear of the detail panel (480px + 16px inset) */}
      <MapBehavior focus={focus} focusOffsetX={detailPanelOffset} onMapClick={onMapClick} />
      {points.map((point) => (
        <ObservationMarker
          key={point.id}
          isSelected={point.id === selectedId}
          onClick={onMarkerClick}
          point={point}
        />
      ))}
    </MapContainer>
  )
}

export default ObservationsMapClient
