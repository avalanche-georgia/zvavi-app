/// <reference types="leaflet.markercluster" />
import { markerClassName } from '@components/features/observations/map/observationPinIcon'
import { divIcon, type MarkerCluster } from 'leaflet'

const diameter = 34

// Nearby stations grouped while zoomed out: their count on a dark circle with a
// soft halo, same look as the observation clusters. Zooming in splits it up.
const stationClusterIcon = (cluster: MarkerCluster) =>
  divIcon({
    className: markerClassName,
    html: `<span class="bg-ink text-copy-sm shadow-marker-cluster grid size-full place-items-center rounded-full font-semibold text-white">${cluster.getChildCount()}</span>`,
    iconAnchor: [diameter / 2, diameter / 2],
    iconSize: [diameter, diameter],
  })

export default stationClusterIcon
