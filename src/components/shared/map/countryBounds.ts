import { georgiaBounds } from '@domain/constants'
import { latLngBounds } from 'leaflet'

const { east, north, south, west } = georgiaBounds

// The furthest a map zooms out to
export const countryBounds = latLngBounds([south, west], [north, east])

// The furthest a map pans to
export const countryPanBounds = countryBounds.pad(0.15)
