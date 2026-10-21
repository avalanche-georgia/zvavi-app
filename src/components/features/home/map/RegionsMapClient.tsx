'use client'

import { useMemo } from 'react'
import { FitInCountry } from '@components/shared/map'
import { useTranslations } from 'next-intl'
import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet'

import { computeBounds } from './computeMapBounds'
import RegionShape from './RegionShape'
import type { HeroRegion } from '../types'

import 'leaflet/dist/leaflet.css'

// Initial view only — FitInCountry fits the zones (the whole country while none has one) right after mount
const fallbackCenter: [number, number] = [42.1, 43.5]
const fallbackZoom = 7

export type RegionsMapProps = {
  highlightedId: HeroRegion['id'] | null
  onHover: (regionId: HeroRegion['id'] | null) => void
  regions: HeroRegion[]
}

// Every region's zone in its danger colour. Zooming out stops around Georgia.
const RegionsMapClient = ({ highlightedId, onHover, regions }: RegionsMapProps) => {
  const t = useTranslations()
  const bounds = useMemo(() => computeBounds(regions), [regions])

  return (
    <>
      <MapContainer
        center={fallbackCenter}
        className="bg-map absolute! inset-0 size-full"
        maxBoundsViscosity={0.8}
        zoom={fallbackZoom}
        zoomControl={false}
        zoomSnap={0.25}
      >
        <TileLayer
          attribution="Tiles &copy; Esri"
          url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}"
        />
        <ZoomControl position="bottomright" />
        <FitInCountry bounds={bounds} />
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
