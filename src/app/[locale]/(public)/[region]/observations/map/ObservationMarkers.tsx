import { useRef } from 'react'
import clusterIcon from '@components/shared/map/clusterIcon'
import type { ObservationPoint } from '@domain/types'
import type { MarkerClusterGroup as LeafletClusterGroup } from 'leaflet'
import MarkerClusterGroup from 'react-leaflet-cluster'

import ObservationMarker from './ObservationMarker'

import 'react-leaflet-cluster/dist/assets/MarkerCluster.css'

type ObservationMarkersProps = {
  hoveredId: number | null
  onMarkerClick: (id: number) => void
  points: ObservationPoint[]
  // Desktop: px left of centre a picked pin lands at, clear of the detail panel
  revealOffsetX?: number
  selectedId: number | null
}

// Clustered so dense areas stay readable. Picking an observation zooms in until
// its pin leaves the cluster; zoomed back out, the cluster holding it is lit.
const ObservationMarkers = ({
  hoveredId,
  onMarkerClick,
  points,
  revealOffsetX,
  selectedId,
}: ObservationMarkersProps) => {
  const clusterRef = useRef<LeafletClusterGroup>(null)

  return (
    <MarkerClusterGroup
      ref={clusterRef}
      chunkedLoading
      iconCreateFunction={clusterIcon}
      maxClusterRadius={32}
      showCoverageOnHover={false}
    >
      {points.map((point) => (
        <ObservationMarker
          key={point.id}
          clusterRef={clusterRef}
          isHighlighted={point.id === hoveredId}
          isSelected={point.id === selectedId}
          onClick={onMarkerClick}
          point={point}
          revealOffsetX={revealOffsetX}
        />
      ))}
    </MarkerClusterGroup>
  )
}

export default ObservationMarkers
