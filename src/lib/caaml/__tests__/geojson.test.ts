import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'

import buildRegionsGeoJson from '../geojson'

const region = { caamlRegionId: 'GE-MM-01', id: 'gudauri', nameEn: 'Gudauri' }

const square = (offset = 0) => [
  [
    [44.1234567 + offset, 42.1234567],
    [44.2234567 + offset, 42.1234567],
    [44.2234567 + offset, 42.2234567],
    [44.1234567 + offset, 42.1234567],
  ],
]

const zoneOf = (...geometries: unknown[]) => ({
  features: geometries.map((geometry) => ({ geometry, properties: {}, type: 'Feature' })),
  type: 'FeatureCollection',
})

const seededZone = () => {
  const sql = fs.readFileSync(
    path.resolve(
      __dirname,
      '../../../../supabase/migrations/20260505000003_seed_gudauri_geojson.sql',
    ),
    'utf8',
  )

  return JSON.parse(sql.match(/forecast_zone = '([\s\S]*?)'::jsonb/)![1])
}

describe('buildRegionsGeoJson', () => {
  it('merges Polygon and MultiPolygon geometries into one rounded MultiPolygon', () => {
    const zone = zoneOf(
      { coordinates: square(), type: 'Polygon' },
      { coordinates: [square(1)], type: 'MultiPolygon' },
      { coordinates: [44, 42], type: 'Point' },
    )
    const { featureCollection } = buildRegionsGeoJson([{ ...region, forecastZone: zone }])
    const [feature] = featureCollection.features

    expect(featureCollection.features).toHaveLength(1)
    expect(feature.properties).toEqual({ name: 'Gudauri', regionID: 'GE-MM-01' })
    expect(feature.geometry.coordinates).toHaveLength(2)
    expect(feature.geometry.coordinates[0][0][0]).toEqual([44.12346, 42.12346])
  })

  it('drops consecutive duplicates created by rounding', () => {
    const ring = [
      [44, 42],
      [44.000001, 42],
      [45, 42],
      [45, 43],
      [44, 42],
    ]
    const { featureCollection } = buildRegionsGeoJson([
      { ...region, forecastZone: zoneOf({ coordinates: [ring], type: 'Polygon' }) },
    ])

    expect(featureCollection.features[0].geometry.coordinates[0][0]).toEqual([
      [44, 42],
      [45, 42],
      [45, 43],
      [44, 42],
    ])
  })

  it('keeps a polygon unrounded when rounding would degenerate a ring', () => {
    const ring = [
      [44, 42],
      [44.000001, 42],
      [44.000001, 42.000001],
      [44, 42],
    ]
    const { featureCollection } = buildRegionsGeoJson([
      { ...region, forecastZone: zoneOf({ coordinates: [ring], type: 'Polygon' }) },
    ])

    expect(featureCollection.features[0].geometry.coordinates[0][0]).toEqual(ring)
  })

  it.each([
    ['null', null],
    ['not a FeatureCollection', { type: 'Feature' }],
    ['non-numeric coordinates', zoneOf({ coordinates: [[['a', 'b']]], type: 'Polygon' })],
    ['points only', zoneOf({ coordinates: [44, 42], type: 'Point' })],
  ])('omits a region whose zone is %s', (_label, forecastZone) => {
    const result = buildRegionsGeoJson([{ ...region, forecastZone }])

    expect(result.featureCollection.features).toEqual([])
    expect(result.omittedRegionIds).toEqual(['gudauri'])
  })

  it('keeps the real seeded polygon to a sane size', () => {
    const { featureCollection } = buildRegionsGeoJson([{ ...region, forecastZone: seededZone() }])
    const size = JSON.stringify(featureCollection).length

    expect(featureCollection.features).toHaveLength(1)
    expect(size).toBeLessThan(60_000)
    console.info(`seeded Gudauri zone: ${size} bytes`)
  })
})
