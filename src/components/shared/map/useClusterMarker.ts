import { useEffect, useRef } from 'react'
import type { Marker, MarkerClusterGroup } from 'leaflet'
import { useMap } from 'react-leaflet'

import highlightCluster from './highlightCluster'
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

  useEffect(() => {
    const marker = markerRef.current
    const group = clusterRef.current

    if (!isActive || !marker || !group) return undefined

    return highlightCluster(map, group, marker)
  }, [clusterRef, isActive, map, markerRef])

  // Next tick: on mount (picked before the map opened) the cluster group only
  // joins the map after this effect, and the cluster tree needs it there.
  // Deselecting (or a newer pick) cancels a reveal still on its way.
  useEffect(() => {
    const marker = markerRef.current

    if (!isSelected || !marker) return undefined

    let cancelReveal: VoidFunction | undefined
    const timeout = setTimeout(() => {
      const group = clusterRef.current

      if (!group) return

      cancelReveal = revealMarker({
        group,
        map,
        marker,
        offsetX: revealOffsetX,
        onRevealed: (revealed) => onRevealedRef.current?.(revealed),
      })
    })

    return () => {
      clearTimeout(timeout)
      cancelReveal?.()
    }
  }, [clusterRef, isSelected, map, markerRef, revealOffsetX])
}

export default useClusterMarker
