import { latLngBounds } from 'leaflet'

// Georgia, with a margin: the furthest a map zooms out to
export const countryBounds = latLngBounds([40.9, 39.8], [43.7, 46.9])

// The furthest a map pans to
export const countryPanBounds = countryBounds.pad(0.15)
