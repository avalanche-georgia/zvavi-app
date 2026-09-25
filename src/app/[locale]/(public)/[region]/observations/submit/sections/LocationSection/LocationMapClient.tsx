'use client'

import { useState } from 'react'
import {
  BaseMapLayers,
  baseMapMaxZoom,
  RegionBoundary,
  useRegionBounds,
} from '@components/shared/map'
import type { Region } from '@domain/types'
import type { Map as LeafletMap } from 'leaflet'
import { MapContainer, useMapEvents, ZoomControl } from 'react-leaflet'

import DraggablePin from './DraggablePin'
import MapHint from './MapHint'
import MapOverlayControls from './MapOverlayControls'
import useGeolocatePin from './useGeolocatePin'
import useMapSync from './useMapSync'

import 'leaflet/dist/leaflet.css'
import { cn } from '@/lib/utils'

// Used only if a region has neither a forecast zone nor a map center
const fallbackCenter: [number, number] = [42.1, 43.5]
const fallbackZoom = 7

const ClickHandler = ({ onPick }: { onPick: (lat: number, lng: number) => void }) => {
  useMapEvents({ click: (event) => onPick(event.latlng.lat, event.latlng.lng) })

  return null
}

export type LocationMapClientProps = {
  isExpanded: boolean
  latitude: number | null
  longitude: number | null
  onExpandedToggle: () => void
  onPick: (lat: number, lng: number) => void
  region: Region
  regionName: string
}

const LocationMapClient = ({
  isExpanded,
  latitude,
  longitude,
  onExpandedToggle,
  onPick,
  region,
  regionName,
}: LocationMapClientProps) => {
  const [map, setMap] = useState<LeafletMap | null>(null)
  // "Region + 20%" for the initial view, pan limit, and zoom-out limit
  const bounds = useRegionBounds(region, 0.2)
  const { isLocating, locate } = useGeolocatePin({ bounds, map, onPick, regionName })
  const hasPin = latitude != null && longitude != null

  useMapSync({ isExpanded, latitude, longitude, map })

  const regionCenter: [number, number] | undefined = region.mapCenter
    ? [region.mapCenter.lat, region.mapCenter.lng]
    : undefined

  return (
    <div className="border-rule rounded-media relative isolate -mx-1 overflow-hidden border md:mx-0">
      <MapContainer
        ref={setMap}
        bounds={bounds ?? undefined}
        center={bounds ? undefined : (regionCenter ?? fallbackCenter)}
        className={cn(
          'bg-map w-full cursor-crosshair transition-[height] duration-250',
          isExpanded ? 'h-[62vh]' : 'h-65 md:h-80',
        )}
        maxBounds={bounds ?? undefined}
        maxBoundsViscosity={1}
        maxZoom={baseMapMaxZoom}
        zoom={bounds ? undefined : (region.defaultZoom ?? fallbackZoom)}
        zoomControl={false}
      >
        <BaseMapLayers />
        <RegionBoundary bounds={bounds} region={region} />
        <ZoomControl position="bottomleft" />
        <ClickHandler onPick={onPick} />
        {hasPin && <DraggablePin latitude={latitude} longitude={longitude} onPick={onPick} />}
      </MapContainer>
      <MapOverlayControls
        isExpanded={isExpanded}
        isLocating={isLocating}
        onExpandedToggle={onExpandedToggle}
        onLocate={locate}
      />
      <MapHint hasPin={hasPin} />
    </div>
  )
}

export default LocationMapClient
