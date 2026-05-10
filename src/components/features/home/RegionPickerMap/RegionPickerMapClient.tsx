'use client'

import { useMemo } from 'react'
import type { RegionWithHazard } from '@data/queries/fetchRegionsWithHazard'
import type { FitBoundsOptions } from 'leaflet'
import { useTranslations } from 'next-intl'
import { MapContainer, TileLayer } from 'react-leaflet'

import { computeBounds } from './computeMapBounds'
import RegionPolygon from './RegionPolygon'

import 'leaflet/dist/leaflet.css'

const fallbackCenter: [number, number] = [42.1, 43.5]
const fallbackZoom = 7

type RegionPickerMapClientProps = {
  regions: RegionWithHazard[]
}

const RegionPickerMapClient = ({ regions }: RegionPickerMapClientProps) => {
  const t = useTranslations()
  const regionBounds = useMemo(() => computeBounds(regions), [regions])
  const boundsPadding: FitBoundsOptions['padding'] = regions.length > 1 ? [50, 50] : [130, 130]

  return (
    <div className="space-y-2">
      <MapContainer
        bounds={regionBounds ?? undefined}
        boundsOptions={regionBounds ? { padding: boundsPadding } : undefined}
        center={regionBounds ? undefined : fallbackCenter}
        className="z-30 h-115 w-full cursor-pointer rounded-xl md:h-150"
        zoom={regionBounds ? undefined : fallbackZoom}
      >
        <TileLayer
          attribution="Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ"
          url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}"
        />
        {regions.map((region) => (
          <RegionPolygon key={region.id} region={region} />
        ))}
      </MapContainer>
      <p className="text-center text-sm text-gray-400">{t('regions.picker.moreSoon')}</p>
    </div>
  )
}

export default RegionPickerMapClient
