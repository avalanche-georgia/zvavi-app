'use client'

import { useRegionContext } from '@domain/context/RegionContext'
import clsx from 'clsx'
import type { FeatureCollection } from 'geojson'
import type { PathOptions } from 'leaflet'
import { GeoJSON, MapContainer, TileLayer } from 'react-leaflet'

import 'leaflet/dist/leaflet.css'

const zoneStyle: PathOptions = {
  color: '#dc2626',
  fillColor: '#dc2626',
  fillOpacity: 0.15,
  weight: 2,
}

type ForecastAreaMapClientProps = {
  className?: string
}

const ForecastAreaMapClient = ({ className }: ForecastAreaMapClientProps) => {
  const { region } = useRegionContext()
  const { defaultZoom, forecastZone, mapCenter } = region!

  if (!mapCenter || !defaultZoom) return null

  const center: [number, number] = [mapCenter.lat, mapCenter.lng]

  return (
    <div className="px-2">
      <MapContainer
        center={center}
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

        {(forecastZone as FeatureCollection | null)?.features.length ? (
          <GeoJSON data={forecastZone as FeatureCollection} style={zoneStyle} />
        ) : null}
      </MapContainer>
    </div>
  )
}

export default ForecastAreaMapClient
