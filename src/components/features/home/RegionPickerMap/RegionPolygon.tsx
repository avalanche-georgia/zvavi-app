'use client'
import { useCallback, useRef } from 'react'
import type { RegionWithHazard } from '@data/queries/fetchRegionsWithHazard'
import { hazardLevelNamesByScale } from '@domain/constants'
import type { HazardLevelScale } from '@domain/types'
import type { FeatureCollection } from 'geojson'
import type { GeoJSON as LeafletGeoJSON, PathOptions } from 'leaflet'
import { useTranslations } from 'next-intl'
import { GeoJSON, Tooltip } from 'react-leaflet'

const hazardHexColors: Record<HazardLevelScale, string> = {
  '0': '#d0d5de',
  '1': '#6ac828',
  '2': '#f8f024',
  '3': '#f88f2c',
  '4': '#eb450b',
  '5': '#1b1a1e',
}

type RegionPolygonProps = {
  onRegionClick: (regionId: string) => void
  region: RegionWithHazard
}

const RegionPolygon = ({ onRegionClick, region }: RegionPolygonProps) => {
  const t = useTranslations()
  const geoJsonRef = useRef<LeafletGeoJSON>(null)
  const color = hazardHexColors[region.overallHazardLevel ?? '0']

  const baseStyle: PathOptions = { color, fillColor: color, fillOpacity: 0.4, weight: 2 }

  const handleMouseover = useCallback(() => {
    geoJsonRef.current?.setStyle({ fillOpacity: 0.65, weight: 3 })
  }, [])

  const handleMouseout = useCallback(() => {
    geoJsonRef.current?.setStyle({ fillOpacity: 0.4, weight: 2 })
  }, [])

  const handleClick = useCallback(() => {
    onRegionClick(region.id)
  }, [onRegionClick, region.id])

  if (!region.forecastZone) return null

  return (
    <GeoJSON
      ref={geoJsonRef}
      data={region.forecastZone as FeatureCollection}
      eventHandlers={{ click: handleClick, mouseout: handleMouseout, mouseover: handleMouseover }}
      style={baseStyle}
    >
      <Tooltip sticky>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 120 }}>
          <span style={{ fontWeight: 600 }}>{t(`regions.names.${region.id}`)}</span>
          <span style={{ color, fontSize: 12, fontWeight: 500 }}>
            {t(hazardLevelNamesByScale[region.overallHazardLevel ?? '0'])}
          </span>
        </div>
      </Tooltip>
    </GeoJSON>
  )
}

export default RegionPolygon
