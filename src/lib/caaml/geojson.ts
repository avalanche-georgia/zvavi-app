import type { Feature, FeatureCollection, MultiPolygon, Position } from 'geojson'
import { z } from 'zod'

export type RegionZoneSource = {
  caamlRegionId: string
  forecastZone: unknown
  id: string
  nameEn: string
}

type RegionProperties = { name: string; regionID: string }
type Polygon = Position[][]

const position = z.array(z.number().finite()).min(2)
const ring = z.array(position).min(4)
const geometry = z.union([
  z.object({ coordinates: z.array(ring), type: z.literal('Polygon') }),
  z.object({ coordinates: z.array(z.array(ring)), type: z.literal('MultiPolygon') }),
  // Any other geometry type is ignored, not treated as an invalid zone
  z.object({ type: z.string().refine((type) => type !== 'Polygon' && type !== 'MultiPolygon') }),
])
const zoneSchema = z.object({
  features: z.array(z.object({ geometry: geometry.nullable(), type: z.literal('Feature') })),
  type: z.literal('FeatureCollection'),
})

// ~1 m. The seeded polygon has 14-digit DMS-derived coordinates.
const roundCoordinate = (value: number) => Math.round(value * 1e5) / 1e5

const isSamePosition = (first: Position, second: Position) =>
  first.length === second.length && first.every((value, index) => value === second[index])

const roundRing = (positions: Position[]) =>
  positions
    .map((point) => point.map(roundCoordinate))
    .filter((point, index, rounded) => index === 0 || !isSamePosition(point, rounded[index - 1]))

// A polygon whose rounding would leave a ring with < 4 positions is kept unrounded
const roundPolygon = (polygon: Polygon): Polygon => {
  const rounded = polygon.map(roundRing)

  return rounded.every((positions) => positions.length >= 4) ? rounded : polygon
}

// All Polygon/MultiPolygon geometries of the zone, merged into one MultiPolygon
const toMultiPolygon = (forecastZone: unknown): MultiPolygon | null => {
  const zone = zoneSchema.safeParse(forecastZone)

  if (!zone.success) return null

  const polygons = zone.data.features.flatMap(({ geometry: shape }) => {
    if (!shape || !('coordinates' in shape)) return []

    return shape.type === 'Polygon' ? [shape.coordinates] : shape.coordinates
  })

  if (!polygons.length) return null

  return { coordinates: polygons.map(roundPolygon), type: 'MultiPolygon' }
}

export type RegionsGeoJson = {
  featureCollection: FeatureCollection<MultiPolygon, RegionProperties>
  omittedRegionIds: string[]
}

const buildRegionsGeoJson = (regions: RegionZoneSource[]): RegionsGeoJson => {
  const features: Feature<MultiPolygon, RegionProperties>[] = []
  const omittedRegionIds: string[] = []

  for (const { caamlRegionId, forecastZone, id, nameEn } of regions) {
    const multiPolygon = toMultiPolygon(forecastZone)

    if (!multiPolygon) {
      omittedRegionIds.push(id)
      continue
    }

    features.push({
      geometry: multiPolygon,
      properties: { name: nameEn, regionID: caamlRegionId },
      type: 'Feature',
    })
  }

  return { featureCollection: { features, type: 'FeatureCollection' }, omittedRegionIds }
}

export default buildRegionsGeoJson
