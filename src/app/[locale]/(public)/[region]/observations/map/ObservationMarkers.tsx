import { useRef } from 'react'
import type { ObservationPoint } from '@domain/types'
import type { MarkerClusterGroup as LeafletClusterGroup } from 'leaflet'
import MarkerClusterGroup from 'react-leaflet-cluster'

import observationClusterIcon from './observationClusterIcon'
import ObservationMarker from './ObservationMarker'

import 'react-leaflet-cluster/dist/assets/MarkerCluster.css'

type ObservationMarkersProps = {
  hoveredId: number | null
  onMarkerClick: (id: number) => void
  points: ObservationPoint[]
  selectedId: number | null
}

// Clustered so dense areas stay readable; the selected pin stays out of the
// clusters, so it's always visible on its own
const ObservationMarkers = ({
  hoveredId,
  onMarkerClick,
  points,
  selectedId,
}: ObservationMarkersProps) => {
  const clusterRef = useRef<LeafletClusterGroup>(null)
  const selectedPoint = points.find((point) => point.id === selectedId)

  return (
    <>
      <MarkerClusterGroup
        ref={clusterRef}
        chunkedLoading
        iconCreateFunction={observationClusterIcon}
        maxClusterRadius={32}
        showCoverageOnHover={false}
      >
        {points
          .filter((point) => point.id !== selectedId)
          .map((point) => (
            <ObservationMarker
              key={point.id}
              clusterRef={clusterRef}
              isHighlighted={point.id === hoveredId}
              isSelected={false}
              onClick={onMarkerClick}
              point={point}
            />
          ))}
      </MarkerClusterGroup>

      {selectedPoint && (
        <ObservationMarker
          clusterRef={clusterRef}
          isHighlighted={false}
          isSelected
          onClick={onMarkerClick}
          point={selectedPoint}
        />
      )}
    </>
  )
}

export default ObservationMarkers
