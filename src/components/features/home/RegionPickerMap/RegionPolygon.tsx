'use client'

import { useCallback, useRef } from 'react'
import { backgroundColorByHazardLevel, hazardIcons } from '@components/constants'
import type { RegionWithHazard } from '@data/queries/fetchRegionsWithHazard'
import { hazardLevelNamesByScale } from '@domain/constants'
import clsx from 'clsx'
import type { FeatureCollection } from 'geojson'
import type { GeoJSON as LeafletGeoJSON, PathOptions } from 'leaflet'
import { useTranslations } from 'next-intl'
import { GeoJSON, Popup } from 'react-leaflet'
import { Link } from 'src/i18n/navigation'

import { hazardHexColors, hoverStrokeClassByLevel, strokeColorByLevel } from './constants'

import { routes } from '@/routes'

const RegionPolygon = ({ region }: { region: RegionWithHazard }) => {
  const t = useTranslations()
  const geoJsonRef = useRef<LeafletGeoJSON | null>(null)
  const level = region.overallHazardLevel ?? '0'
  const color = hazardHexColors[level]
  const icon = hazardIcons[level]

  const baseStyle: PathOptions = {
    className: clsx('transition', hoverStrokeClassByLevel[level]),
    color,
    fillColor: color,
    fillOpacity: 0.5,
    opacity: 0.6,
    weight: 2,
  }

  const handlePopupOpen = useCallback(() => {
    geoJsonRef.current?.setStyle({ color: strokeColorByLevel[level], weight: 3 })
  }, [level])

  const handlePopupClose = useCallback(() => {
    geoJsonRef.current?.setStyle({ color, weight: 2 })
  }, [color])

  if (!region.forecastZone) return null

  return (
    <GeoJSON
      ref={geoJsonRef}
      data={region.forecastZone as FeatureCollection}
      eventHandlers={{ popupclose: handlePopupClose, popupopen: handlePopupOpen }}
      style={baseStyle}
    >
      <Popup>
        <div className="flex min-w-35 flex-col items-center gap-2 px-2 pt-1 pb-2">
          <span className="text-base font-bold">{t(`regions.names.${region.id}`)}</span>
          <div className="flex flex-col items-center gap-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="Hazard level" className="h-16 w-auto" src={icon.src} />
            <p
              className={clsx(
                'm-0! rounded-full px-3 py-1.5 font-semibold',
                { 'text-white': level === '5' },
                backgroundColorByHazardLevel[level],
              )}
            >
              {t(hazardLevelNamesByScale[level])} – {level}
            </p>
          </div>
          <Link
            className="mt-1 text-sm font-semibold text-gray-700! underline"
            href={routes.regionHome(region.id)}
          >
            {t('regions.picker.openRegionPage')} →
          </Link>
        </div>
      </Popup>
    </GeoJSON>
  )
}

export default RegionPolygon
