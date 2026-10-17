/// <reference types="leaflet.markercluster" />
import type { Map as LeafletMap, Marker, MarkerClusterGroup } from 'leaflet'

type RevealMarkerParams = {
  group: MarkerClusterGroup
  map: LeafletMap
  marker: Marker
  // Px left of centre to land the marker at (e.g. clear of a side panel)
  offsetX: number
  onRevealed: (marker: Marker) => void
}

// markercluster's own tree: the deepest cluster holding the marker. The marker
// shows on its own from the zoom after that cluster's.
type ClusteredMarker = Marker & { __parent?: { _zoom: number } }

// Brings a marker out of its cluster in ONE move — straight to the zoom where it
// splits out and the centre that puts it `offsetX` left of centre. (zoomToShowLayer
// centres first, so an offset needed a second, visible slide.)
const revealMarker = ({ group, map, marker, offsetX, onRevealed }: RevealMarkerParams) => {
  const clusterZoom = (marker as ClusteredMarker).__parent?._zoom ?? -Infinity
  const zoom = Math.max(map.getZoom(), clusterZoom + 1)

  // Still clustered at max zoom (same spot): markercluster fans it out instead
  if (zoom > map.getMaxZoom()) {
    group.zoomToShowLayer(marker, () => onRevealed(marker))

    return
  }

  const target = map.unproject(map.project(marker.getLatLng(), zoom).add([offsetX, 0]), zoom)
  // No offset: a marker already on screen stays put. With one, it must sit there.
  const isInPlace =
    offsetX === 0
      ? map.getBounds().contains(marker.getLatLng())
      : map.project(target).distanceTo(map.project(map.getCenter())) < 1

  if (zoom === map.getZoom() && isInPlace && map.hasLayer(marker)) {
    onRevealed(marker)

    return
  }

  // The marker joins the map with the re-clustering after the move
  const handleShown = () => {
    if (!map.hasLayer(marker)) return

    group.off('animationend', handleShown)
    map.off('moveend', handleShown)
    onRevealed(marker)
  }

  group.on('animationend', handleShown)
  map.on('moveend', handleShown)
  map.setView(target, zoom)
}

export default revealMarker
