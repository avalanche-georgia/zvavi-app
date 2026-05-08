import type { FeatureCollection } from 'geojson'

export type RegionGeoData = {
  defaultZoom: number
  forecastZone: FeatureCollection
  mapCenter: { lat: number; lng: number }
}
