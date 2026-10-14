'use client'

import { useEffect } from 'react'
import type { LatLngBounds } from 'leaflet'
import { useMap } from 'react-leaflet'

const fitOptions = { animate: false, maxZoom: 10, padding: [48, 48] as [number, number] }

// Keeps every zone in view: on mount and whenever the card changes size.
// invalidateSize first — Leaflet caches the container size, and a stale 0×0
// leaves a grey box with misplaced layers.
const FitRegions = ({ bounds }: { bounds: LatLngBounds }) => {
  const map = useMap()

  useEffect(() => {
    const fit = () => {
      map.invalidateSize()
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
