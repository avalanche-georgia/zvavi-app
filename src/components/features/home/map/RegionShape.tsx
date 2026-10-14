'use client'

import { useEffect, useMemo, useRef } from 'react'
import { hazardLevelNamesByScale } from '@domain/constants'
import type { FeatureCollection } from 'geojson'
import { divIcon, geoJSON, type Marker as LeafletMarker } from 'leaflet'
import { useTranslations } from 'next-intl'
import { GeoJSON, Marker, Tooltip } from 'react-leaflet'
import { useRouter } from 'src/i18n/navigation'

import { getZoneStyle } from './mapColors'
import { markerClasses } from './markerClasses'
import { tooltipClasses } from './tooltipClasses'
import useRegionStatus from '../hero/useRegionStatus'
import type { HeroRegion } from '../types'

import rememberRegion from '@/lib/rememberRegion'
import { routes } from '@/routes'

type RegionShapeProps = {
  isHighlighted: boolean
  onHover: (regionId: HeroRegion['id'] | null) => void
  region: HeroRegion
}

// A region's zone in its danger colour, with a numbered marker at its centre.
// Hover links it to the list row; a click remembers the region and opens its home.
const RegionShape = ({ isHighlighted, onHover, region }: RegionShapeProps) => {
  const t = useTranslations()
  const { getStatus } = useRegionStatus()
  const router = useRouter()
  const markerRef = useRef<LeafletMarker | null>(null)
  const { forecastZone, id, state } = region
  const level = state === 'current' ? region.level : null
  const zone = forecastZone as FeatureCollection | null

  const center = useMemo(() => (zone ? geoJSON(zone).getBounds().getCenter() : null), [zone])
  const icon = useMemo(
    () =>
      divIcon({
        className: '',
        html: `<div aria-hidden="true" class="${markerClasses(level)}">${level ?? '–'}</div>`,
        iconAnchor: [19, 19],
        iconSize: [38, 38],
      }),
    [level],
  )

  // The marker's dot is plain HTML — toggled in place, so its scale animates
  useEffect(() => {
    markerRef.current?.getElement()?.firstElementChild?.classList.toggle('scale-120', isHighlighted)
  }, [icon, isHighlighted])

  if (!zone || !center) return null

  const label = `${t(`regions.names.${id}`)} · ${
    level ? `${level} ${t(hazardLevelNamesByScale[level])}` : getStatus(region)
  }`
  const eventHandlers = {
    click: () => {
      rememberRegion(id)
      router.push(routes.regionHome(id))
    },
    mouseout: () => onHover(null),
    mouseover: () => onHover(id),
  }

  return (
    <>
      <GeoJSON data={zone} eventHandlers={eventHandlers} style={getZoneStyle(level, isHighlighted)}>
        <Tooltip className={tooltipClasses} sticky>
          {label}
        </Tooltip>
      </GeoJSON>
      <Marker
        ref={markerRef}
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
