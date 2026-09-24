'use client'

import { PisteTileLayer, topoMaxZoom, TopoTileLayer } from '@components/shared/map'
import { useRegionContext } from '@domain/context/RegionContext'
import type { FeatureCollection } from 'geojson'
import type { PathOptions } from 'leaflet'
import { GeoJSON, MapContainer } from 'react-leaflet'

import 'leaflet/dist/leaflet.css'
import { cn } from '@/lib/utils'

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
        className={cn('z-30 h-[calc(100svh-112px)] rounded-xl', className)}
        maxZoom={topoMaxZoom}
        scrollWheelZoom
        zoom={defaultZoom}
      >
        <TopoTileLayer />
        <PisteTileLayer />

        {(forecastZone as FeatureCollection | null)?.features.length ? (
          <GeoJSON data={forecastZone as FeatureCollection} style={zoneStyle} />
        ) : null}
      </MapContainer>
    </div>
  )
}

export default ForecastAreaMapClient
