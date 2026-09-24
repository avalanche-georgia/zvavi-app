import type { ObservationPoint } from '@domain/types'
import MarkerClusterGroup from 'react-leaflet-cluster'

import observationClusterIcon from './observationClusterIcon'
import ObservationMarker from './ObservationMarker'

import 'react-leaflet-cluster/dist/assets/MarkerCluster.css'

type ObservationMarkersProps = {
  onMarkerClick: (id: number) => void
  points: ObservationPoint[]
  selectedId: number | null
}

// Clustered so dense areas stay readable; the selected pin stays out of the
// clusters, so it's always visible on its own
const ObservationMarkers = ({ onMarkerClick, points, selectedId }: ObservationMarkersProps) => {
  const selectedPoint = points.find((point) => point.id === selectedId)

  return (
    <>
      <MarkerClusterGroup
        chunkedLoading
        iconCreateFunction={observationClusterIcon}
        maxClusterRadius={44}
        showCoverageOnHover={false}
      >
        {points
          .filter((point) => point.id !== selectedId)
          .map((point) => (
            <ObservationMarker
              key={point.id}
              isSelected={false}
              onClick={onMarkerClick}
              point={point}
            />
          ))}
      </MarkerClusterGroup>

      {selectedPoint && (
        <ObservationMarker isSelected onClick={onMarkerClick} point={selectedPoint} />
      )}
    </>
  )
}

export default ObservationMarkers
