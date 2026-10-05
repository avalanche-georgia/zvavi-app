import { beforeEach, describe, expect, it, vi } from 'vitest'

import { GET } from '../regions/route'

const fetchZones = vi.hoisted(() => vi.fn())

vi.mock('@data/queries/fetchPublicRegionZones', () => ({ default: fetchZones }))

const ring = [
  [44, 42],
  [45, 42],
  [45, 43],
  [44, 42],
]
const zone = {
  features: [
    { geometry: { coordinates: [ring], type: 'Polygon' }, properties: {}, type: 'Feature' },
  ],
  type: 'FeatureCollection',
}
const region = { caamlRegionId: 'GE-MM-01', forecastZone: zone, id: 'gudauri', nameEn: 'Gudauri' }
const request = () => new Request('https://avalanche.ge/api/v1/regions')

describe('GET /api/v1/regions', () => {
  beforeEach(() => {
    fetchZones.mockReset()
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  it('responds GeoJSON with one MultiPolygon feature per region', async () => {
    fetchZones.mockResolvedValue([region, { ...region, forecastZone: null, id: 'svaneti' }])

    const response = await GET(request())
    const body = await response.json()

    expect(response.status).toBe(200)
    expect(response.headers.get('content-type')).toBe('application/geo+json; charset=utf-8')
    expect(response.headers.get('cache-control')).toBe(
      'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
    )
    expect(response.headers.get('etag')).toMatch(/^"[0-9a-f]{32}"$/)
    expect(body.features).toEqual([
      {
        geometry: { coordinates: [[ring]], type: 'MultiPolygon' },
        properties: { name: 'Gudauri', regionID: 'GE-MM-01' },
        type: 'Feature',
      },
    ])
  })

  it('responds 500 when regions exist but none has a usable zone', async () => {
    fetchZones.mockResolvedValue([{ ...region, forecastZone: null }])

    const response = await GET(request())

    expect(response.status).toBe(500)
    expect(response.headers.get('cache-control')).toBe('no-store')
  })

  it('responds 500 on a data error', async () => {
    fetchZones.mockRejectedValue(new Error('down'))

    expect((await GET(request())).status).toBe(500)
  })
})
