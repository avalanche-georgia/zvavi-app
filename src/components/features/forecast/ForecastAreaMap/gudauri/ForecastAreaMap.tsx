'use client'

import clsx from 'clsx'
import type { PathOptions } from 'leaflet'
import { GeoJSON, MapContainer, TileLayer } from 'react-leaflet'

import { defaultZoom, forecastZone, mapCenter } from './forecastZone'

import 'leaflet/dist/leaflet.css'

const zoneStyle: PathOptions = {
  color: '#ff7800',
  fillColor: '#ff7800',
  fillOpacity: 0.15,
  weight: 2,
}

type ForecastMapProps = {
  className?: string
}

const ForecastAreaMap = ({ className }: ForecastMapProps) => (
  <div className="px-2">
    <MapContainer
      center={mapCenter}
      className={clsx('z-30 h-[calc(100svh-112px)] rounded-xl', className)}
      scrollWheelZoom
      zoom={defaultZoom}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.stadiamaps.com/">Stadia</a>, <a href="https://www.openstreetmap.org/copyright">OSM</a>'
        url="https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.png"
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
