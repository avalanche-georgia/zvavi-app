import type { LatLngExpression, Map as LeafletMap } from 'leaflet'

// Pans so the point sits `offsetX` px left of centre — clear of a panel floating
// over the right side of the map
const panToOffset = (map: LeafletMap, point: LatLngExpression, offsetX: number) => {
  const zoom = map.getZoom()

  map.panTo(map.unproject(map.project(point, zoom).add([offsetX, 0]), zoom))
}

export default panToOffset
