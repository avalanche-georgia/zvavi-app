import type { LatLng, LatLngExpression, Map as LeafletMap } from 'leaflet'

// The map centre that puts `point` `offsetX` px left of centre at `zoom` — keeps
// it clear of a panel floating over the right side of the map
const offsetCenter = (
  map: LeafletMap,
  point: LatLngExpression,
  offsetX: number,
  zoom = map.getZoom(),
): LatLng => map.unproject(map.project(point, zoom).add([offsetX, 0]), zoom)

export default offsetCenter
