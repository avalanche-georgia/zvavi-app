'use client'

import { useEffect, useMemo, useRef } from 'react'
import { hazardLevelNamesByScale } from '@domain/constants'
import type { FeatureCollection } from 'geojson'
import {
  divIcon,
  type GeoJSON as LeafletGeoJSON,
  geoJSON,
  type Marker as LeafletMarker,
} from 'leaflet'
import { useTranslations } from 'next-intl'
import { GeoJSON, Marker, Tooltip } from 'react-leaflet'
import { useRouter } from 'src/i18n/navigation'

import { getZoneStyle } from './mapColors'
import { markerClasses } from './markerClasses'
import { tooltipClasses } from './tooltipClasses'
import type { HeroRegion } from '../types'

import { routes } from '@/routes'

type RegionShapeProps = {
  isHighlighted: boolean
  onHover: (regionId: HeroRegion['id'] | null) => void
  region: HeroRegion
}

// A region's zone in its danger colour, with a numbered marker at its centre.
// Hover links it to the list row; a click opens the forecast.
const RegionShape = ({ isHighlighted, onHover, region }: RegionShapeProps) => {
  const t = useTranslations()
  const router = useRouter()
  const zoneRef = useRef<LeafletGeoJSON | null>(null)
  const markerRef = useRef<LeafletMarker | null>(null)
  const { forecastZone, id, state } = region
  const level = state === 'current' ? region.level : null
  const zone = forecastZone as FeatureCollection | null

  const center = useMemo(() => (zone ? geoJSON(zone).getBounds().getCenter() : null), [zone])
  const icon = useMemo(
    () =>
      divIcon({
        className: '',
        html: `<div class="${markerClasses(level)}">${level ?? '–'}</div>`,
        iconAnchor: [19, 19],
        iconSize: [38, 38],
      }),
    [level],
  )

  // GeoJSON only reads `style` when it is created; the marker's dot is plain
  // HTML — both are updated in place, so the dot's scale animates
  useEffect(() => {
    zoneRef.current?.setStyle(getZoneStyle(level, isHighlighted))
    markerRef.current?.getElement()?.firstElementChild?.classList.toggle('scale-120', isHighlighted)
  }, [icon, isHighlighted, level])

  if (!zone || !center) return null

  const label = `${t(`regions.names.${id}`)} · ${
    level ? `${level} ${t(hazardLevelNamesByScale[level])}` : t('home.map.noForecast')
  }`
  const forecastRoutes = routes.forecastsByRegion(id)
  const eventHandlers = {
    click: () => router.push(level ? forecastRoutes.current : forecastRoutes.history),
    mouseout: () => onHover(null),
    mouseover: () => onHover(id),
  }

  return (
    <>
      <GeoJSON
        ref={zoneRef}
        data={zone}
        eventHandlers={eventHandlers}
        style={getZoneStyle(level, isHighlighted)}
      >
        <Tooltip className={tooltipClasses} sticky>
          {label}
        </Tooltip>
      </GeoJSON>
      <Marker
        ref={markerRef}
        alt={label}
        eventHandlers={eventHandlers}
        icon={icon}
        keyboard={false}
        position={center}
      >
        <Tooltip className={tooltipClasses} direction="top" offset={[0, -22]}>
          {label}
        </Tooltip>
      </Marker>
    </>
  )
}

export default RegionShape
