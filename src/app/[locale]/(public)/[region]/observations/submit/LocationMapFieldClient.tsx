'use client'

import { useEffect, useMemo, useRef } from 'react'
import type { Region } from '@domain/types'
import type { FeatureCollection } from 'geojson'
import L, { geoJSON, type LatLngBounds, type PathOptions } from 'leaflet'
import { GeoJSON, MapContainer, Marker, TileLayer, useMap, useMapEvents } from 'react-leaflet'

import 'leaflet/dist/leaflet.css'

const zoneStyle: PathOptions = {
  color: '#dc2626',
  fillOpacity: 0.05,
  weight: 1.5,
}

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

// Caps how far out the user can zoom to roughly "region + 20%" — Leaflet's
// maxBounds alone only restricts panning, not zoom level, so this needs the
// map instance (only available once mounted, hence useMap + effect).
const ZoomLimiter = ({ bounds }: { bounds: LatLngBounds }) => {
  const map = useMap()

  useEffect(() => {
    map.setMinZoom(map.getBoundsZoom(bounds))
  }, [map, bounds])

  return null
}

// MapContainer's own bounds prop fits the region exactly on mount — this bumps
// that one level closer. Guarded to run only once; setZoom isn't idempotent
// like setMinZoom above, so re-firing would keep zooming in further.
const InitialZoomBoost = () => {
  const map = useMap()
  const hasRun = useRef(false)

  useEffect(() => {
    if (hasRun.current) return

    hasRun.current = true
    map.setZoom(map.getZoom() + 1)
  }, [map])

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

  // One padding value drives the initial view, pan limit, and zoom-out limit —
  // "region + 20%" for all three.
  const bounds = zoneBounds?.pad(0.2)

  const regionCenter: [number, number] | undefined = region.mapCenter
    ? [region.mapCenter.lat, region.mapCenter.lng]
    : undefined

  return (
    <MapContainer
      bounds={bounds}
      center={bounds ? undefined : (regionCenter ?? fallbackCenter)}
      className="z-30 h-116 w-full cursor-crosshair rounded-xl"
      maxBounds={bounds}
      maxBoundsViscosity={1}
      maxZoom={maxZoom}
      zoom={bounds ? undefined : (region.defaultZoom ?? fallbackZoom) + 1}
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

      {(region.forecastZone as FeatureCollection | null)?.features.length ? (
        <GeoJSON data={region.forecastZone as FeatureCollection} style={zoneStyle} />
      ) : null}
      {bounds && <ZoomLimiter bounds={bounds} />}
      {bounds && <InitialZoomBoost />}
      <ClickHandler onPick={onChange} />
      {latitude != null && longitude != null && (
        <Marker icon={pinIcon} position={[latitude, longitude]} />
      )}
    </MapContainer>
  )
}

export default LocationMapFieldClient
