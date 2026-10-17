/// <reference types="leaflet.markercluster" />
import type { LeafletEventHandlerFn, Map as LeafletMap, Marker, MarkerClusterGroup } from 'leaflet'

import offsetCenter from './offsetCenter'

type RevealMarkerParams = {
  group: MarkerClusterGroup
  map: LeafletMap
  marker: Marker
  // Px left of centre to land the marker at (e.g. clear of a side panel)
  offsetX: number
  onRevealed: (marker: Marker) => void
}

// markercluster's tree: the deepest cluster holding the marker — it shows on its
// own from the zoom after that cluster's. `_animatingZoom`: Leaflet ignores a
// zooming setView while a zoom animation runs.
type ClusteredMarker = Marker & { __parent?: { _zoom: number } }
type AnimatedMap = LeafletMap & { _animatingZoom?: boolean }

// Brings a marker out of its cluster in ONE move — straight to the zoom where it
// splits out and the centre that puts it `offsetX` left of centre. Returns a
// cancel: a newer pick (or unmount) drops this reveal and its listeners.
const revealMarker = ({ group, map, marker, offsetX, onRevealed }: RevealMarkerParams) => {
  let isActive = true
  const listeners: [LeafletMap | MarkerClusterGroup, string, LeafletEventHandlerFn][] = []

  const listen = (
    target: LeafletMap | MarkerClusterGroup,
    event: string,
    handler: LeafletEventHandlerFn,
  ) => {
    target.on(event, handler)
    listeners.push([target, event, handler])
  }

  const cancel = () => {
    isActive = false
    listeners.forEach(([target, event, handler]) => target.off(event, handler))
  }

  const finish = () => {
    if (!isActive) return

    cancel()
    onRevealed(marker)
  }

  const start = () => {
    const clusterZoom = (marker as ClusteredMarker).__parent?._zoom ?? -Infinity
    const zoom = Math.max(map.getZoom(), clusterZoom + 1)

    // Still clustered at max zoom (same spot): markercluster fans it out instead
    if (zoom > map.getMaxZoom()) {
      group.zoomToShowLayer(marker, () => {
        if (!isActive) return
        if (offsetX) map.panTo(offsetCenter(map, marker.getLatLng(), offsetX))
        finish()
      })

      return
    }

    const target = offsetCenter(map, marker.getLatLng(), offsetX, zoom)
    // No offset: a marker already on screen stays put. With one, it must sit there.
    const isInPlace =
      offsetX === 0
        ? map.getBounds().contains(marker.getLatLng())
        : map.project(target).distanceTo(map.project(map.getCenter())) < 1

    if (zoom === map.getZoom() && isInPlace && map.hasLayer(marker)) {
      finish()

      return
    }

    // The marker joins the map with the re-clustering after the move
    const handleShown = () => map.hasLayer(marker) && finish()

    listen(group, 'animationend', handleShown)
    listen(map, 'moveend', handleShown)
    map.setView(target, zoom)
  }

  // A zoom already running (a previous pick): start once it lands
  if ((map as AnimatedMap)._animatingZoom) {
    const handleZoomEnd = () => {
      map.off('zoomend', handleZoomEnd)
      if (isActive) start()
    }

    listen(map, 'zoomend', handleZoomEnd)
  } else {
    start()
  }

  return cancel
}

export default revealMarker
