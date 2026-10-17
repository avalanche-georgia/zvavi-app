'use client'

import { useEffect, useState } from 'react'
import MapOverlayControls from '@components/features/observations/form/sections/LocationSection/MapOverlayControls'
import useMapSync from '@components/features/observations/form/sections/LocationSection/useMapSync'
import {
  BaseMapLayers,
  baseMapMaxZoom,
  countryBounds,
  countryPanBounds,
} from '@components/shared/map'
import type { Map as LeafletMap } from 'leaflet'
import { MapContainer, useMapEvents, ZoomControl } from 'react-leaflet'

import StationDraggablePin from './StationDraggablePin'
import StationMapHint from './StationMapHint'
import useStationGeolocate from './useStationGeolocate'

import 'leaflet/dist/leaflet.css'
import { cn } from '@/lib/utils'

const ClickHandler = ({
  onLocationPick,
}: {
  onLocationPick: (latitude: number, longitude: number) => void
}) => {
  useMapEvents({ click: (event) => onLocationPick(event.latlng.lat, event.latlng.lng) })

  return null
}

export type StationLocationMapClientProps = {
  isExpanded: boolean
  latitude: number | null
  longitude: number | null
  onExpandedToggle: () => void
  onLocationPick: (latitude: number, longitude: number) => void
  // Set only for typed coordinates: the map pans there
  panTarget: [number, number] | null
}

// The observation form's location map, framed on Georgia instead of a region —
// stations have no region yet. Opens on the station's pin when it has one.
const StationLocationMapClient = ({
  isExpanded,
  latitude,
  longitude,
  onExpandedToggle,
  onLocationPick,
  panTarget,
}: StationLocationMapClientProps) => {
  const [map, setMap] = useState<LeafletMap | null>(null)
  const { isLocating, locate } = useStationGeolocate({ map, onLocationPick })
  const hasPin = latitude != null && longitude != null

  useMapSync({ isExpanded, map, panTarget })

  // Zoom-out limit — maxBounds alone only restricts panning. Depends on the
  // container size, so recalculated whenever the map resizes.
  useEffect(() => {
    if (!map) return undefined

    const updateMinZoom = () => map.setMinZoom(map.getBoundsZoom(countryBounds))

    updateMinZoom()
    map.on('resize', updateMinZoom)

    return () => {
      map.off('resize', updateMinZoom)
    }
  }, [map])

  return (
    // The height lives on this wrapper: react-leaflet ignores className changes on
    // MapContainer after it mounts, so the map just fills whatever height we animate
    <div
      className={cn(
        'border-rule rounded-media relative isolate -mx-1 overflow-hidden border transition-[height] duration-250 md:mx-0',
        isExpanded ? 'h-[62vh]' : 'h-65 md:h-80',
      )}
    >
      <MapContainer
        ref={setMap}
        bounds={hasPin ? undefined : countryBounds}
        center={hasPin ? [latitude, longitude] : undefined}
        className="bg-map size-full cursor-crosshair"
        maxBounds={countryPanBounds}
        maxBoundsViscosity={1}
        maxZoom={baseMapMaxZoom}
        zoom={hasPin ? 12 : undefined}
        zoomControl={false}
      >
        <BaseMapLayers />
        <ZoomControl position="bottomleft" />
        <ClickHandler onLocationPick={onLocationPick} />
        {hasPin && (
          <StationDraggablePin
            latitude={latitude}
            longitude={longitude}
            onLocationPick={onLocationPick}
          />
        )}
      </MapContainer>
      <MapOverlayControls
        isExpanded={isExpanded}
        isLocating={isLocating}
        onExpandedToggle={onExpandedToggle}
        onLocate={locate}
      />
      <StationMapHint hasPin={hasPin} />
    </div>
  )
}

export default StationLocationMapClient
