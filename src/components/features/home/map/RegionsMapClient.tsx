'use client'

import { useMemo } from 'react'
import { useTranslations } from 'next-intl'
import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet'

import { computeBounds } from './computeMapBounds'
import FitRegions from './FitRegions'
import RegionShape from './RegionShape'
import type { HeroRegion } from '../types'

import 'leaflet/dist/leaflet.css'

// Georgia, while no region has a zone yet
const fallbackCenter: [number, number] = [42.1, 43.5]
const fallbackZoom = 7

export type RegionsMapProps = {
  highlightedId: HeroRegion['id'] | null
  onHover: (regionId: HeroRegion['id'] | null) => void
  regions: HeroRegion[]
}

// Every region's zone in its danger colour. The wheel scrolls the page, not the map.
const RegionsMapClient = ({ highlightedId, onHover, regions }: RegionsMapProps) => {
  const t = useTranslations()
  const bounds = useMemo(() => computeBounds(regions), [regions])

  return (
    <>
      <MapContainer
        center={fallbackCenter}
        className="bg-map absolute! inset-0 size-full"
        scrollWheelZoom={false}
        zoom={fallbackZoom}
        zoomControl={false}
        zoomSnap={0.25}
      >
        <TileLayer
          attribution="Tiles &copy; Esri"
          url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}"
        />
        <ZoomControl position="bottomright" />
        {bounds && <FitRegions bounds={bounds} />}
        {regions.map((region) => (
          <RegionShape
            key={region.id}
            isHighlighted={region.id === highlightedId}
            onHover={onHover}
            region={region}
          />
        ))}
      </MapContainer>
      <p className="bg-surface text-copy-sm shadow-overlay rounded-control pointer-events-none absolute top-3.5 left-3.5 z-500 px-3 py-2 font-semibold">
        {t('home.map.manyRegions')}
      </p>
    </>
  )
}

export default RegionsMapClient
