import type { FeatureCollection } from 'geojson'

import { coordinates } from './coordinates'
import type { RegionGeoData } from '../types'

export const gudauriGeoData: RegionGeoData = {
  defaultZoom: 11,
  forecastZone: {
    features: [
      {
        geometry: {
          coordinates,
          type: 'MultiPolygon',
        },
        properties: {
          cat: 2,
          fid: 1,
          label: null,
          name: 'gudauri_zone',
          value: 2,
        },
        type: 'Feature',
      },
    ],
    type: 'FeatureCollection',
  } as FeatureCollection,
  mapCenter: { lat: 42.508966823500344, lng: 44.50906030513315 },
}
