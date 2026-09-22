'use client'

import { useMemo } from 'react'
import type { Region } from '@domain/types'
import type { FeatureCollection } from 'geojson'
import L, { geoJSON, type LatLngBounds } from 'leaflet'
import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet'

import 'leaflet/dist/leaflet.css'

// react-leaflet's default marker icon resolves relative to the bundler's asset
// path, which breaks under Next.js — point it at the package's own CDN copy.
const pinIcon = L.icon({
  iconAnchor: [12, 41],
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconSize: [25, 41],
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

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
  const bounds = useMemo<LatLngBounds | null>(() => {
    if (!region.forecastZone) return null

    return geoJSON(region.forecastZone as FeatureCollection)
      .getBounds()
      .pad(0.2)
  }, [region.forecastZone])

  const fallbackCenter: [number, number] | undefined = region.mapCenter
    ? [region.mapCenter.lat, region.mapCenter.lng]
    : undefined

  return (
    <MapContainer
      bounds={bounds ?? undefined}
      center={bounds ? undefined : fallbackCenter}
      className="z-30 h-80 w-full cursor-crosshair rounded-xl"
      zoom={bounds ? undefined : (region.defaultZoom ?? 10)}
    >
      <TileLayer
        attribution='&copy; <a href="https://opentopomap.org">OpenTopoMap</a>, <a href="https://www.openstreetmap.org/copyright">OSM</a>'
        url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
      />
      <ClickHandler onPick={onChange} />
      {latitude != null && longitude != null && (
        <Marker icon={pinIcon} position={[latitude, longitude]} />
      )}
    </MapContainer>
  )
}

export default LocationMapFieldClient
