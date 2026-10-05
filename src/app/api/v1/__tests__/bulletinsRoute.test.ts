import { beforeEach, describe, expect, it, vi } from 'vitest'

import { GET, HEAD, OPTIONS } from '../bulletins/latest/route'

import typical from '@/lib/caaml/__fixtures__/typical.json'

const fetchSources = vi.hoisted(() => vi.fn())

vi.mock('@data/queries/fetchPublicBulletinSources', () => ({ default: fetchSources }))

const url = 'https://avalanche.ge/api/v1/bulletins/latest'
const candidate = (forecast: Record<string, unknown> = typical.forecast) => ({
  forecast,
  forecastId: forecast.id as number,
  region: typical.region,
  regionId: 'gudauri',
})

const request = (init?: RequestInit) => new Request(url, init)

const expectedHeaders = {
  'access-control-allow-origin': '*',
  'access-control-expose-headers': 'ETag',
  'cache-control': 'public, max-age=0, s-maxage=60, stale-while-revalidate=300',
  'content-language': 'en',
  'content-type': 'application/json; charset=utf-8',
  'x-content-type-options': 'nosniff',
}

const headersOf = (response: Response) => Object.fromEntries(response.headers.entries())

describe('GET /api/v1/bulletins/latest', () => {
  beforeEach(() => {
    fetchSources.mockReset()
    fetchSources.mockResolvedValue([candidate()])
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  it('responds 200 with exactly the contract headers', async () => {
    const response = await GET(request())
    const { etag, ...headers } = headersOf(response)

    expect(response.status).toBe(200)
    expect(headers).toEqual(expectedHeaders)
    expect(etag).toMatch(/^"[0-9a-f]{32}"$/)
    expect((await response.json()).bulletins).toHaveLength(1)
  })

  it('keeps the ETag stable for identical data and changes it when data changes', async () => {
    const first = (await GET(request())).headers.get('etag')
    const second = (await GET(request())).headers.get('etag')

    fetchSources.mockResolvedValue([candidate({ ...typical.forecast, weather: 'Clear skies.' })])

    const changed = (await GET(request())).headers.get('etag')

    expect(second).toBe(first)
    expect(changed).not.toBe(first)
  })

  it('responds 304 without a body to a matching If-None-Match, with the same headers', async () => {
    const etag = (await GET(request())).headers.get('etag')!
    const response = await GET(request({ headers: { 'If-None-Match': `W/"x", ${etag}` } }))

    expect(response.status).toBe(304)
    expect(await response.text()).toBe('')
    expect(headersOf(response)).toEqual({ ...expectedHeaders, etag })
  })

  it('answers HEAD with the GET headers and no body', async () => {
    const response = await HEAD(request({ method: 'HEAD' }))

    expect(response.status).toBe(200)
    expect(response.headers.get('etag')).toMatch(/^"/)
    expect(await response.text()).toBe('')
  })

  it('answers OPTIONS with CORS preflight headers', async () => {
    const response = OPTIONS()

    expect(response.status).toBe(204)
    expect(headersOf(response)).toEqual({
      'access-control-allow-headers': 'Authorization, Content-Type, If-None-Match',
      'access-control-allow-methods': 'GET, HEAD, OPTIONS',
      'access-control-allow-origin': '*',
      'access-control-expose-headers': 'ETag',
      'access-control-max-age': '86400',
    })
  })

  it('ignores the Authorization header', async () => {
    const plain = await GET(request())
    const authorized = await GET(request({ headers: { Authorization: 'Bearer anything' } }))

    expect(authorized.status).toBe(plain.status)
    expect(await authorized.text()).toBe(await plain.text())
  })

  it('responds 200 with an empty list when no region has a published forecast', async () => {
    fetchSources.mockResolvedValue([])

    const response = await GET(request())

    expect(response.status).toBe(200)
    expect((await response.json()).bulletins).toEqual([])
  })

  it.each([
    ['the data layer fails', () => fetchSources.mockRejectedValue(new Error('down'))],
    [
      'every forecast is unusable',
      () => fetchSources.mockResolvedValue([candidate({ ...typical.forecast, validUntil: null })]),
    ],
  ])('responds an uncacheable problem+json 500 when %s', async (_label, arrange) => {
    arrange()

    const response = await GET(request())

    expect(response.status).toBe(500)
    expect(headersOf(response)).toEqual({
      'access-control-allow-origin': '*',
      'access-control-expose-headers': 'ETag',
      'cache-control': 'no-store',
      'content-type': 'application/problem+json',
      'x-content-type-options': 'nosniff',
    })
    expect(await response.json()).toEqual({
      status: 500,
      title: 'Bulletins are temporarily unavailable',
      type: 'about:blank',
    })
  })

  it('serves the good region when another one fails', async () => {
    fetchSources.mockResolvedValue([
      candidate(),
      { ...candidate({ ...typical.forecast, id: 9, publishedAt: null }), regionId: 'svaneti' },
    ])

    const response = await GET(request())

    expect(response.status).toBe(200)
    expect((await response.json()).bulletins).toHaveLength(1)
    expect(console.error).toHaveBeenCalledWith(
      '[GET /api/v1/bulletins/latest] bulletin omitted:',
      expect.objectContaining({ forecastId: 9, regionId: 'svaneti' }),
    )
  })
})
