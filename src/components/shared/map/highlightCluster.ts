/// <reference types="leaflet.markercluster" />
import type { Map as LeafletMap, Marker, MarkerClusterGroup } from 'leaflet'

// Cluster icons style themselves inside this class (see clusterIcon)
const highlightedClusterClassName = 'is-highlighted'

type GroupHighlight = {
  active: Set<Marker>
  lit: HTMLElement[]
  refresh: VoidFunction
}

const highlights = new WeakMap<MarkerClusterGroup, GroupHighlight>()

const createGroupHighlight = (map: LeafletMap, group: MarkerClusterGroup) => {
  const highlight: GroupHighlight = {
    active: new Set(),
    lit: [],
    // Worked out from all active markers together, so one ending doesn't unlight
    // a cluster another still needs
    refresh: () => {
      highlight.lit.forEach((element) => element.classList.remove(highlightedClusterClassName))
      highlight.lit = [...highlight.active].flatMap((marker) => {
        const parent = group.getVisibleParent(marker) as Marker | null
        const element = parent && parent !== marker ? parent.getElement() : undefined

        return element ? [element] : []
      })
      highlight.lit.forEach((element) => element.classList.add(highlightedClusterClassName))
    },
  }

  // Re-clustering (zoom) and pans (clusters re-entering the view) rebuild icons
  group.on('animationend', highlight.refresh)
  map.on('moveend', highlight.refresh)
  highlights.set(group, highlight)

  return highlight
}

// Lights the visible cluster holding `marker` while it's highlighted or selected.
// Returns the undo.
const highlightCluster = (map: LeafletMap, group: MarkerClusterGroup, marker: Marker) => {
  const highlight = highlights.get(group) ?? createGroupHighlight(map, group)

  highlight.active.add(marker)
  highlight.refresh()

  return () => {
    highlight.active.delete(marker)
    highlight.refresh()

    if (highlight.active.size) return

    group.off('animationend', highlight.refresh)
    map.off('moveend', highlight.refresh)
    highlights.delete(group)
  }
}

export default highlightCluster
