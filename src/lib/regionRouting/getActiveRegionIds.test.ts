import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

const { afterMock, captureServerErrorMock, reportServerErrorMock } = vi.hoisted(() => ({
  afterMock: vi.fn(),
  captureServerErrorMock: vi.fn(),
  reportServerErrorMock: vi.fn(),
}))

vi.mock('next/server', () => ({ after: afterMock }))
vi.mock('@/lib/posthog/server', () => ({
  captureServerError: captureServerErrorMock,
  reportServerError: reportServerErrorMock,
}))

const ttlMs = 600 * 1000
const retryMs = 30 * 1000
const fetchMock = vi.fn()

const respondWith = (ids: string[]) =>
  fetchMock.mockResolvedValueOnce(Response.json(ids.map((id) => ({ id }))))

const failWith = (error: unknown = new DOMException('timeout', 'TimeoutError')) =>
  fetchMock.mockRejectedValueOnce(error)

// The background refresh handed to after() in the latest call
const settleBackgroundRefresh = () => afterMock.mock.lastCall?.[0]

// The module keeps its cache in module scope: a fresh copy per test
const loadGetActiveRegionIds = async () => (await import('./getActiveRegionIds')).default

const loadWithStaleList = async (ids: string[]) => {
  const getActiveRegionIds = await loadGetActiveRegionIds()

  respondWith(ids)
  await getActiveRegionIds()
  vi.advanceTimersByTime(ttlMs)

  return getActiveRegionIds
}

describe('getActiveRegionIds', () => {
  beforeEach(() => {
    vi.resetModules()
    vi.useFakeTimers({ toFake: ['Date'] })
    vi.setSystemTime(new Date('2026-01-15T12:00:00Z'))
    vi.stubGlobal('fetch', fetchMock)
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.unstubAllGlobals()
    vi.clearAllMocks()
    fetchMock.mockReset()
  })

  it('fetches once and serves the list from cache while it is fresh', async () => {
    const getActiveRegionIds = await loadGetActiveRegionIds()

    respondWith(['kazbegi'])

    expect(await getActiveRegionIds()).toEqual(new Set(['kazbegi']))

    vi.advanceTimersByTime(ttlMs - 1)

    expect(await getActiveRegionIds()).toEqual(new Set(['kazbegi']))
    expect(fetchMock).toHaveBeenCalledTimes(1)
  })

  it('shares one lookup between concurrent callers', async () => {
    const getActiveRegionIds = await loadGetActiveRegionIds()

    respondWith(['kazbegi'])

    const results = await Promise.all([getActiveRegionIds(), getActiveRegionIds()])

    expect(results).toEqual([new Set(['kazbegi']), new Set(['kazbegi'])])
    expect(fetchMock).toHaveBeenCalledTimes(1)
  })

  it('serves a stale list at once and refreshes it after the response', async () => {
    const getActiveRegionIds = await loadWithStaleList(['kazbegi'])

    respondWith(['kazbegi', 'svaneti'])

    expect(await getActiveRegionIds()).toEqual(new Set(['kazbegi']))

    await settleBackgroundRefresh()

    expect(await getActiveRegionIds()).toEqual(new Set(['kazbegi', 'svaneti']))
  })

  it('shares one background refresh between concurrent stale callers', async () => {
    const getActiveRegionIds = await loadWithStaleList(['kazbegi'])

    respondWith(['kazbegi'])
    await Promise.all([getActiveRegionIds(), getActiveRegionIds()])

    expect(afterMock.mock.calls[0][0]).toBe(afterMock.mock.calls[1][0])
    expect(fetchMock).toHaveBeenCalledTimes(2)
  })

  it.each([
    ['a timeout', () => failWith()],
    ['an error status', () => fetchMock.mockResolvedValueOnce(new Response(null, { status: 500 }))],
    ['malformed rows', () => fetchMock.mockResolvedValueOnce(Response.json([{ name: 'x' }]))],
    ['an empty list', () => respondWith([])],
  ])('keeps the last good list after %s, without asking again at once', async (_, fail) => {
    const getActiveRegionIds = await loadWithStaleList(['kazbegi'])

    fail()
    await getActiveRegionIds()
    await settleBackgroundRefresh()

    expect(await getActiveRegionIds()).toEqual(new Set(['kazbegi']))
    expect(fetchMock).toHaveBeenCalledTimes(2)
  })

  it('returns null with nothing cached and waits before asking again', async () => {
    const getActiveRegionIds = await loadGetActiveRegionIds()

    failWith()

    expect(await getActiveRegionIds()).toBeNull()

    vi.advanceTimersByTime(retryMs - 1)

    expect(await getActiveRegionIds()).toBeNull()
    expect(fetchMock).toHaveBeenCalledTimes(1)

    vi.advanceTimersByTime(1)
    respondWith(['kazbegi'])

    expect(await getActiveRegionIds()).toEqual(new Set(['kazbegi']))
  })

  it('reports a run of failures, not a single one, at most once a minute', async () => {
    const getActiveRegionIds = await loadGetActiveRegionIds()

    for (let attempt = 1; attempt <= 5; attempt += 1) {
      failWith()
      await getActiveRegionIds()
      vi.advanceTimersByTime(retryMs)
    }

    expect(reportServerErrorMock.mock.calls.map(([, context]) => context)).toEqual([
      { consecutiveFailures: 3, scope: 'regionRouting | getActiveRegionIds' },
      { consecutiveFailures: 5, scope: 'regionRouting | getActiveRegionIds' },
    ])
  })

  it('reports a failed background refresh inside the promise after() holds', async () => {
    const getActiveRegionIds = await loadWithStaleList(['kazbegi'])

    for (let attempt = 1; attempt <= 3; attempt += 1) {
      failWith()
      await getActiveRegionIds()
      await settleBackgroundRefresh()
      vi.advanceTimersByTime(retryMs)
    }

    expect(captureServerErrorMock).toHaveBeenCalledTimes(1)
    expect(reportServerErrorMock).not.toHaveBeenCalled()
  })

  it('starts counting failures again after a success', async () => {
    const getActiveRegionIds = await loadGetActiveRegionIds()

    failWith()
    failWith()
    respondWith(['kazbegi'])

    for (let attempt = 1; attempt <= 3; attempt += 1) {
      await getActiveRegionIds()
      vi.advanceTimersByTime(retryMs)
    }

    vi.advanceTimersByTime(ttlMs)
    failWith()
    await getActiveRegionIds()
    await settleBackgroundRefresh()

    expect(captureServerErrorMock).not.toHaveBeenCalled()
    expect(reportServerErrorMock).not.toHaveBeenCalled()
  })
})
