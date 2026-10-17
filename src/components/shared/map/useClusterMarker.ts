import { useEffect, useRef } from 'react'
import type { Marker, MarkerClusterGroup } from 'leaflet'
import { useMap } from 'react-leaflet'

import revealMarker from './revealMarker'

type UseClusterMarkerParams = {
  clusterRef: React.RefObject<MarkerClusterGroup | null>
  // Its list row is hovered — lights the marker, or the cluster holding it
  isHighlighted: boolean
  // Picked (list row or pin) — zooms in until the marker leaves its cluster
  isSelected: boolean
  markerRef: React.RefObject<Marker | null>
  // Runs once a picked marker is on screen (straight away when already there)
  onRevealed?: (marker: Marker) => void
  // Px left of centre to land a picked marker at (clear of a side panel); 0 centres it
  revealOffsetX?: number
}

// Cluster icons style themselves inside this class (see clusterIcon)
const highlightedClusterClassName = 'is-highlighted'

// The one list ↔ map mechanism for a marker inside a MarkerClusterGroup, shared
// by every list + map page (see useListHover for the list side)
const useClusterMarker = ({
  clusterRef,
  isHighlighted,
  isSelected,
  markerRef,
  onRevealed,
  revealOffsetX = 0,
}: UseClusterMarkerParams) => {
  const map = useMap()
  const isActive = isHighlighted || isSelected
  // Latest callback without re-running the reveal when the caller re-renders
  const onRevealedRef = useRef(onRevealed)

  useEffect(() => {
    onRevealedRef.current = onRevealed
  })

  // Highlight: the visible parent cluster gets the class. Re-applied after every
  // re-clustering (zoom), which rebuilds the cluster icons.
  useEffect(() => {
    const marker = markerRef.current
    const group = clusterRef.current

    if (!isActive || !marker || !group) return undefined

    let highlighted: HTMLElement | undefined

    const apply = () => {
      highlighted?.classList.remove(highlightedClusterClassName)
      const parent = group.getVisibleParent(marker) as Marker | null

      highlighted = parent && parent !== marker ? parent.getElement() : undefined
      highlighted?.classList.add(highlightedClusterClassName)
    }

    apply()
    group.on('animationend', apply)

    return () => {
      group.off('animationend', apply)
      highlighted?.classList.remove(highlightedClusterClassName)
    }
  }, [clusterRef, isActive, markerRef])

  // Reveal. Next tick: on mount (picked before the map opened) the cluster group
  // only joins the map after this effect, and the cluster tree needs it there.
  useEffect(() => {
    const marker = markerRef.current

    if (!isSelected || !marker) return undefined

    const timeout = setTimeout(() => {
      const group = clusterRef.current

      if (!group) return

      revealMarker({
        group,
        map,
        marker,
        offsetX: revealOffsetX,
        onRevealed: (revealed) => onRevealedRef.current?.(revealed),
      })
    })

    return () => clearTimeout(timeout)
  }, [clusterRef, isSelected, map, markerRef, revealOffsetX])
}

export default useClusterMarker
