import { useEffect } from 'react'
import { useMap, useMapEvents } from 'react-leaflet'

type MapBehaviorProps = {
  // Pan here when it changes (e.g. the opened observation). Leave out on a
  // clustered map — its markers reveal themselves (useClusterMarker).
  focus?: [number, number] | null
  onMapClick: VoidFunction
}

// Imperative bits that need the map instance
const MapBehavior = ({ focus, onMapClick }: MapBehaviorProps) => {
  const map = useMap()
  const [focusLat, focusLng] = focus ?? []

  useMapEvents({ click: onMapClick })

  // The container is resized by layout changes Leaflet can't see (mobile
  // list/map toggle, window resize) — re-measure so tiles fill it
  useEffect(() => {
    const observer = new ResizeObserver(() => map.invalidateSize())

    observer.observe(map.getContainer())

    return () => observer.disconnect()
  }, [map])

  useEffect(() => {
    if (focusLat === undefined || focusLng === undefined) return

    map.panTo([focusLat, focusLng])
  }, [map, focusLat, focusLng])

  return null
}

export default MapBehavior
