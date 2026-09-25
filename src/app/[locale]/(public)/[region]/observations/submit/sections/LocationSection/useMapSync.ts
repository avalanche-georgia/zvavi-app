import { useEffect } from 'react'
import type { Map as LeafletMap } from 'leaflet'

type UseMapSyncParams = {
  isExpanded: boolean
  latitude: number | null
  longitude: number | null
  map: LeafletMap | null
}

// Matches the map's height transition
const resizeDelayMs = 260

// Keeps the Leaflet map in step with state that changes outside it
const useMapSync = ({ isExpanded, latitude, longitude, map }: UseMapSyncParams) => {
  // Leaflet measures its container once — re-measure after the height animates
  useEffect(() => {
    const timeout = setTimeout(() => map?.invalidateSize(), resizeDelayMs)

    return () => clearTimeout(timeout)
  }, [isExpanded, map])

  // Typed coordinates may land outside the current view — bring the pin into it
  useEffect(() => {
    if (!map || latitude == null || longitude == null) return
    if (!map.getBounds().contains([latitude, longitude])) map.panTo([latitude, longitude])
  }, [latitude, longitude, map])
}

export default useMapSync
