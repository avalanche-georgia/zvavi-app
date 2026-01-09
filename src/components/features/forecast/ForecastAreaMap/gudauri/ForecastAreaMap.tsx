'use client'

import clsx from 'clsx'
import type { PathOptions } from 'leaflet'
import { GeoJSON, MapContainer, TileLayer } from 'react-leaflet'

import { defaultZoom, forecastZone, mapCenter } from './forecastZone'

import 'leaflet/dist/leaflet.css'

const zoneStyle: PathOptions = {
  color: '#dc2626',
  fillColor: '#dc2626',
  fillOpacity: 0.15,
  weight: 2,
}

type ForecastAreaMapProps = {
  className?: string
}

const ForecastAreaMap = ({ className }: ForecastAreaMapProps) => (
  <div className="px-2">
    <MapContainer
      center={mapCenter}
      className={clsx('z-30 h-[calc(100svh-112px)] rounded-xl', className)}
      scrollWheelZoom
      zoom={defaultZoom}
    >
      <TileLayer
        attribution='&copy; <a href="https://opentopomap.org">OpenTopoMap</a>, <a href="https://www.openstreetmap.org/copyright">OSM</a>'
        url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
      />
      <TileLayer
        attribution='<a href="https://www.opensnowmap.org/">OpenSnowMap</a>'
        url="https://tiles.opensnowmap.org/pistes/{z}/{x}/{y}.png"
      />

      {forecastZone.features.length > 0 && <GeoJSON data={forecastZone} style={zoneStyle} />}
    </MapContainer>
  </div>
)

export default ForecastAreaMap
