/// <reference types="leaflet.markercluster" />
import { divIcon, type MarkerCluster } from 'leaflet'

import { markerClassName } from './markerClassName'

// Bubble grows with the number of markers it groups
const getDiameter = (count: number) => {
  if (count < 10) return 30
  if (count < 50) return 36

  return 44
}

// Cluster icon for every clustered map: the count on a dark circle with a soft
// halo — brand blue while it holds a highlighted marker (useClusterMarker adds
// `is-highlighted`). Zooming in splits it up.
const clusterIcon = (cluster: MarkerCluster) => {
  const diameter = getDiameter(cluster.getChildCount())

  return divIcon({
    className: markerClassName,
    html: `<span class="bg-ink in-[.is-highlighted]:bg-brand-blue text-copy-sm shadow-marker-cluster grid size-full place-items-center rounded-full font-semibold text-white">${cluster.getChildCount()}</span>`,
    iconAnchor: [diameter / 2, diameter / 2],
    iconSize: [diameter, diameter],
  })
}

export default clusterIcon
