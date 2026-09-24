'use client'

import { RegionBoundary, useRegionBounds } from '@components/shared/RegionBoundary'
import type { PublicObservation, Region } from '@domain/types'
import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet'

import MapBehavior from './MapBehavior'
import { fallbackCenter, fallbackZoom, maxZoom, topoTiles } from './mapConfig'
import ObservationMarker from './ObservationMarker'
import hasCoordinates from '../helpers/hasCoordinates'

import 'leaflet/dist/leaflet.css'

const detailPanelOffset = (480 + 16) / 2

export type ObservationsMapClientProps = {
  focus: [number, number] | null
  observations: PublicObservation[]
  onMapClick: VoidFunction
  onMarkerClick: (id: number) => void
  region: Region
  selectedId: number | null
}

const ObservationsMapClient = ({
  focus,
  observations,
  onMapClick,
  onMarkerClick,
  region,
  selectedId,
}: ObservationsMapClientProps) => {
  // Opens on the forecast zone; panning and zooming out stop at "region + 30%"
  const bounds = useRegionBounds(region, 0.3)
  const center: [number, number] = region.mapCenter
    ? [region.mapCenter.lat, region.mapCenter.lng]
    : fallbackCenter

  const markers = observations.filter(hasCoordinates)

  return (
    <MapContainer
      bounds={bounds ?? undefined}
      center={bounds ? undefined : center}
      className="bg-map size-full"
      maxBounds={bounds ?? undefined}
      maxBoundsViscosity={1}
      maxZoom={maxZoom}
      zoom={bounds ? undefined : (region.defaultZoom ?? fallbackZoom)}
      zoomControl={false}
    >
      <TileLayer attribution={topoTiles.attribution} maxNativeZoom={maxZoom} url={topoTiles.url} />
      <ZoomControl position="bottomleft" />
      <RegionBoundary bounds={bounds} region={region} />
      {/* Keeps the focused marker clear of the detail panel (480px + 16px inset) */}
      <MapBehavior focus={focus} focusOffsetX={detailPanelOffset} onMapClick={onMapClick} />
      {markers.map((observation) => (
        <ObservationMarker
          key={observation.id}
          isSelected={observation.id === selectedId}
          observation={observation}
          onClick={onMarkerClick}
        />
      ))}
    </MapContainer>
  )
}

export default ObservationsMapClient
