import { useMemo, useRef } from 'react'
import observationPinIcon from '@components/features/observations/map/observationPinIcon'
import panToOffset from '@components/features/observations/map/panToOffset'
import useClusterMarker from '@components/shared/map/useClusterMarker'
import type { ObservationPoint } from '@domain/types'
import type { Marker as LeafletMarker, MarkerClusterGroup } from 'leaflet'
import { useTranslations } from 'next-intl'
import { Marker, Tooltip, useMap } from 'react-leaflet'

type ObservationMarkerProps = {
  // The cluster group the marker lives in
  clusterRef: React.RefObject<MarkerClusterGroup | null>
  // Its list card is hovered
  isHighlighted: boolean
  isSelected: boolean
  point: ObservationPoint
  onClick: (id: number) => void
  revealOffsetX: number | null
}

const ObservationMarker = ({
  clusterRef,
  isHighlighted,
  isSelected,
  onClick,
  point,
  revealOffsetX,
}: ObservationMarkerProps) => {
  const t = useTranslations()
  const map = useMap()
  const markerRef = useRef<LeafletMarker>(null)
  const isLit = isSelected || isHighlighted

  const { id, latitude, longitude, size, type } = point
  // Stable: a new array makes react-leaflet move the marker, which pulls it out
  // of its cluster and back on every list hover
  const position = useMemo<[number, number]>(() => [latitude, longitude], [latitude, longitude])

  useClusterMarker({
    clusterRef,
    isHighlighted,
    isSelected,
    markerRef,
    onRevealed: (marker) =>
      revealOffsetX !== null && panToOffset(map, marker.getLatLng(), revealOffsetX),
  })

  const eventHandlers = { click: () => onClick(id) }
  const label = t('observations.labels.typeAndSize', {
    size,
    type: t(`common.avalancheTypes.${type}`),
  })

  return (
    <Marker
      ref={markerRef}
      eventHandlers={eventHandlers}
      icon={observationPinIcon(size, isLit)}
      position={position}
      // Accessible name for the focusable pin (the tooltip isn't announced)
      title={label}
      // Selected on top, then larger avalanches over smaller ones
      zIndexOffset={isLit ? 1000 : size * 10}
    >
      <Tooltip direction="top" offset={[0, -10]}>
        {label}
      </Tooltip>
    </Marker>
  )
}

export default ObservationMarker
