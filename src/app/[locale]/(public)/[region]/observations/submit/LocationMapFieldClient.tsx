'use client'

import { RegionBoundary, useRegionBounds } from '@components/shared/RegionBoundary'
import type { Region } from '@domain/types'
import L from 'leaflet'
import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet'

import 'leaflet/dist/leaflet.css'

// Brand-colored teardrop pin (matches --color-brand-blue) instead of Leaflet's
// stock blue marker. className cleared — Leaflet's default div-icon class adds
// a white box background/border we don't want behind the SVG.
const pinIcon = L.divIcon({
  className: '',
  html: `<svg width="25" height="41" viewBox="0 0 25 41" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.5 0C5.596 0 0 5.596 0 12.5c0 9.375 12.5 28.5 12.5 28.5S25 21.875 25 12.5C25 5.596 19.404 0 12.5 0z" fill="var(--color-brand-blue)"/>
    <circle cx="12.5" cy="12.5" r="4.5" fill="white"/>
  </svg>`,
  iconAnchor: [12, 41],
  iconSize: [25, 41],
  popupAnchor: [1, -34],
})

// Used only if a region has neither a forecast zone nor a map center — rough
// center of Georgia, matching RegionPickerMapClient's own fallback.
const fallbackCenter: [number, number] = [42.1, 43.5]
const fallbackZoom = 7

// OpenTopoMap only serves tiles up to zoom 17 — without this, zooming past it
// shows blank "max zoom layer = 17" placeholder tiles instead of the map.
const maxZoom = 17

const ClickHandler = ({ onPick }: { onPick: (lat: number, lng: number) => void }) => {
  useMapEvents({
    click: (event) => onPick(event.latlng.lat, event.latlng.lng),
  })

  return null
}

type LocationMapFieldClientProps = {
  latitude: number | null
  longitude: number | null
  onChange: (lat: number, lng: number) => void
  region: Region
}

const LocationMapFieldClient = ({
  latitude,
  longitude,
  onChange,
  region,
}: LocationMapFieldClientProps) => {
  // "Region + 20%" for the initial view, pan limit, and zoom-out limit
  const bounds = useRegionBounds(region, 0.2)

  const regionCenter: [number, number] | undefined = region.mapCenter
    ? [region.mapCenter.lat, region.mapCenter.lng]
    : undefined

  return (
    <MapContainer
      bounds={bounds ?? undefined}
      center={bounds ? undefined : (regionCenter ?? fallbackCenter)}
      className="z-30 h-116 w-full cursor-crosshair rounded-xl"
      maxBounds={bounds ?? undefined}
      maxBoundsViscosity={1}
      maxZoom={maxZoom}
      zoom={bounds ? undefined : (region.defaultZoom ?? fallbackZoom)}
    >
      <TileLayer
        attribution='&copy; <a href="https://opentopomap.org">OpenTopoMap</a>, <a href="https://www.openstreetmap.org/copyright">OSM</a>'
        maxNativeZoom={maxZoom}
        url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
      />
      <TileLayer
        attribution='<a href="https://www.opensnowmap.org/">OpenSnowMap</a>'
        url="https://tiles.opensnowmap.org/pistes/{z}/{x}/{y}.png"
      />

      <RegionBoundary bounds={bounds} region={region} />
      <ClickHandler onPick={onChange} />
      {latitude != null && longitude != null && (
        <Marker icon={pinIcon} position={[latitude, longitude]} />
      )}
    </MapContainer>
  )
}

export default LocationMapFieldClient
