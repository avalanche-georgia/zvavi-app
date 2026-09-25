import { useEffect } from 'react'
import type { Map as LeafletMap } from 'leaflet'

type UseMapSyncParams = {
  isExpanded: boolean
  map: LeafletMap | null
  panTarget: [number, number] | null
}

// Matches the map's height transition
const resizeDelayMs = 260

// Keeps the Leaflet map in step with state that changes outside it
const useMapSync = ({ isExpanded, map, panTarget }: UseMapSyncParams) => {
  // Leaflet measures its container once — re-measure after the height animates
  useEffect(() => {
    const timeout = setTimeout(() => map?.invalidateSize(), resizeDelayMs)

    return () => clearTimeout(timeout)
  }, [isExpanded, map])

  // Typed coordinates may land outside the current view — bring the pin into it.
  // Only for typed input: panning during My location's flyTo would cancel its zoom.
  useEffect(() => {
    if (!map || !panTarget) return
    if (!map.getBounds().contains(panTarget)) map.panTo(panTarget)
  }, [map, panTarget])
}

export default useMapSync
