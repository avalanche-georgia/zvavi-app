'use client'

import { useEffect } from 'react'
import { type LatLngBounds, latLngBounds } from 'leaflet'
import { useMap } from 'react-leaflet'

const fitOptions = { animate: false, maxZoom: 10, padding: [48, 48] as [number, number] }

// Georgia, with a margin: the furthest the map zooms out and pans to
const countryBounds = latLngBounds([40.9, 39.8], [43.7, 46.9])
const panBounds = countryBounds.pad(0.15)

// Keeps every zone in view and the map around Georgia: on mount and when the card's width changes (layout
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
      // Zoomed out no further than the whole country fits the card
      map.setMinZoom(map.getBoundsZoom(countryBounds))
      map.setMaxBounds(panBounds)

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
