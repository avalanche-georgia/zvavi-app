'use client'

import { useEffect } from 'react'
import type { LatLngBounds } from 'leaflet'
import { useMap } from 'react-leaflet'

const fitOptions = { animate: false, maxZoom: 10, padding: [48, 48] as [number, number] }

// Keeps every zone in view: on mount and when the card's width changes (layout
// switch, rotation) — not on height-only changes, so a reader's pan survives
// mobile toolbars showing and hiding. invalidateSize first: Leaflet caches the
// container size, and a stale 0×0 leaves a grey box with misplaced layers.
const FitRegions = ({ bounds }: { bounds: LatLngBounds }) => {
  const map = useMap()

  useEffect(() => {
    let fittedWidth = 0

    const fit = () => {
      const { width } = map.getContainer().getBoundingClientRect()

      map.invalidateSize()

      if (width === fittedWidth) return

      fittedWidth = width
      map.fitBounds(bounds, fitOptions)
    }

    fit()

    const observer = new ResizeObserver(fit)

    observer.observe(map.getContainer())

    return () => observer.disconnect()
  }, [bounds, map])

  return null
}

export default FitRegions
