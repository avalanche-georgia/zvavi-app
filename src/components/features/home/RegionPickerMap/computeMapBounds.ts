import type { RegionWithHazard } from '@data/queries/fetchRegionsWithHazard'
import type { FeatureCollection } from 'geojson'
import { geoJSON, type LatLngBounds } from 'leaflet'

export const computeBounds = (regions: RegionWithHazard[]): LatLngBounds | null =>
  regions
    .filter((region) => region.forecastZone)
    .reduce<LatLngBounds | null>((acc, region) => {
      const layerBounds = geoJSON(region.forecastZone as FeatureCollection).getBounds()

      return acc ? acc.extend(layerBounds) : layerBounds
    }, null)
