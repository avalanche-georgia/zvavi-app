'use client'

import { useMemo } from 'react'
import type { Region } from '@domain/types'
import type { FeatureCollection } from 'geojson'
import L, { geoJSON, type LatLngBounds, type PathOptions } from 'leaflet'
import { GeoJSON, MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet'

import 'leaflet/dist/leaflet.css'

const zoneStyle: PathOptions = {
  color: '#dc2626',
  fillOpacity: 0.05,
  weight: 1.5,
}

// Brand-colored teardrop pin (matches --color-primary) instead of Leaflet's
// stock blue marker. className cleared — Leaflet's default div-icon class adds
// a white box background/border we don't want behind the SVG.
const pinIcon = L.divIcon({
  className: '',
  html: `<svg width="25" height="41" viewBox="0 0 25 41" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.5 0C5.596 0 0 5.596 0 12.5c0 9.375 12.5 28.5 12.5 28.5S25 21.875 25 12.5C25 5.596 19.404 0 12.5 0z" fill="var(--color-primary)"/>
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
  const zoneBounds = useMemo<LatLngBounds | null>(() => {
    if (!region.forecastZone) return null

    return geoJSON(region.forecastZone as FeatureCollection).getBounds()
  }, [region.forecastZone])

  const viewBounds = zoneBounds?.pad(0.2)
  const maxBounds = zoneBounds?.pad(0.5)

  const regionCenter: [number, number] | undefined = region.mapCenter
    ? [region.mapCenter.lat, region.mapCenter.lng]
    : undefined

  return (
    <MapContainer
      bounds={viewBounds}
      center={viewBounds ? undefined : (regionCenter ?? fallbackCenter)}
      className="z-30 h-96 w-full cursor-crosshair rounded-xl"
      maxBounds={maxBounds}
      maxBoundsViscosity={1}
      zoom={viewBounds ? undefined : (region.defaultZoom ?? fallbackZoom)}
    >
      <TileLayer
        attribution='&copy; <a href="https://opentopomap.org">OpenTopoMap</a>, <a href="https://www.openstreetmap.org/copyright">OSM</a>'
        url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
      />
      {(region.forecastZone as FeatureCollection | null)?.features.length ? (
        <GeoJSON data={region.forecastZone as FeatureCollection} style={zoneStyle} />
      ) : null}
      <ClickHandler onPick={onChange} />
      {latitude != null && longitude != null && (
        <Marker icon={pinIcon} position={[latitude, longitude]} />
      )}
    </MapContainer>
  )
}

export default LocationMapFieldClient
