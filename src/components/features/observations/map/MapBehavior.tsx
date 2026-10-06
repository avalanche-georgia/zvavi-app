import { useEffect } from 'react'
import { useMap, useMapEvents } from 'react-leaflet'

type MapBehaviorProps = {
  // Pan here when it changes (e.g. the opened observation)
  focus: [number, number] | null
  // Horizontal px to shift the focus point left of centre — keeps it clear of
  // a panel floating over the right side of the map
  focusOffsetX?: number
  onMapClick: VoidFunction
}

// Imperative bits that need the map instance
const MapBehavior = ({ focus, focusOffsetX = 0, onMapClick }: MapBehaviorProps) => {
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

    const point = map.project([focusLat, focusLng], map.getZoom()).add([focusOffsetX, 0])

    map.panTo(map.unproject(point, map.getZoom()))
  }, [map, focusLat, focusLng, focusOffsetX])

  return null
}

export default MapBehavior
