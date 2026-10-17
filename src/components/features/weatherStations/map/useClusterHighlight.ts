import { useEffect } from 'react'
import type { Marker, MarkerClusterGroup } from 'leaflet'

type UseClusterHighlightParams = {
  clusterRef: React.RefObject<MarkerClusterGroup | null>
  isActive: boolean
  markerRef: React.RefObject<Marker | null>
}

// stationClusterIcon turns brand blue inside this class
export const highlightedClusterClassName = 'is-highlighted'

// A hovered or selected station whose pin is grouped into a cluster lights up
// that cluster instead. Re-applied after every re-clustering (zoom), which
// rebuilds the cluster icons.
const useClusterHighlight = ({ clusterRef, isActive, markerRef }: UseClusterHighlightParams) => {
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
}

export default useClusterHighlight
