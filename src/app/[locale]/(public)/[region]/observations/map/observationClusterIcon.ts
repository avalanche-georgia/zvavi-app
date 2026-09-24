/// <reference types="leaflet.markercluster" />
import { divIcon, type MarkerCluster } from 'leaflet'

import { markerClassName } from './observationPinIcon'

// Bubble grows with the number of observations it groups
const getDiameter = (count: number) => {
  if (count < 10) return 30
  if (count < 50) return 36

  return 44
}

// A group of nearby observations: its count on a dark circle with a soft halo.
// Zooming in splits it up.
const observationClusterIcon = (cluster: MarkerCluster) => {
  const count = cluster.getChildCount()
  const diameter = getDiameter(count)

  return divIcon({
    className: markerClassName,
    html: `<span class="grid size-full place-items-center rounded-full bg-[#2c2e33] text-[13px] font-semibold text-white shadow-[0_0_0_2px_#fff,0_0_0_6px_rgb(44_46_51/.25),0_1px_4px_rgb(0_0_0/.3)]">${count}</span>`,
    iconAnchor: [diameter / 2, diameter / 2],
    iconSize: [diameter, diameter],
  })
}

export default observationClusterIcon
