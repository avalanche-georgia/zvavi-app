import type { FeatureCollection } from 'geojson'

import { coordinates } from './coordinates'

export const forecastZone: FeatureCollection = {
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
}

export const mapCenter: [number, number] = [42.508966823500344, 44.50906030513315]
export const defaultZoom = 11
