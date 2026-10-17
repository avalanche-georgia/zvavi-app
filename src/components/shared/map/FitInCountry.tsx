'use client'

import { useEffect } from 'react'
import type { LatLngBounds } from 'leaflet'
import { useMap } from 'react-leaflet'

import { countryBounds, countryPanBounds } from './countryBounds'

// maxZoom also keeps a single point (zero-size bounds) from zooming all the way in
const fitOptions = { animate: false, maxZoom: 10, padding: [48, 48] as [number, number] }

// Fits `bounds` (the whole country when null or empty) and keeps the map around
// Georgia: on mount and when the container's width changes (layout switch,
// rotation) — not on height-only changes, so a reader's pan survives mobile
// toolbars showing and hiding. invalidateSize first: Leaflet caches the
// container size, and a stale 0×0 leaves a grey box with misplaced layers.
// `bounds` must be stable (memoised) — a new object refits the map.
const FitInCountry = ({ bounds }: { bounds: LatLngBounds | null }) => {
  const map = useMap()

  useEffect(() => {
    const fitBounds = bounds?.isValid() ? bounds : countryBounds
    let fittedWidth = 0
    let minZoom = 0

    const fit = () => {
      const { width } = map.getContainer().getBoundingClientRect()

      map.invalidateSize()

      if (width !== fittedWidth) {
        fittedWidth = width
        map.fitBounds(fitBounds, fitOptions)
      }

      // Limits after the fit: set before it, setMinZoom would queue an animated zoom
      // that undoes the fit a frame later. Zoomed out no further than the whole
      // country fits the container.
      const nextMinZoom = map.getBoundsZoom(countryBounds)

      // Only when it changes: setMinZoom zooms in (animated) if the reader is below it
      if (nextMinZoom !== minZoom) {
        minZoom = nextMinZoom
        map.setMinZoom(minZoom)
      }

      map.setMaxBounds(countryPanBounds)
    }

    fit()

    const observer = new ResizeObserver(fit)

    observer.observe(map.getContainer())

    return () => observer.disconnect()
  }, [bounds, map])

  return null
}

export default FitInCountry
