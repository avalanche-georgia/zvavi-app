import fetchPublicBulletinSources from '@data/queries/fetchPublicBulletinSources'

import { cachedResponse, optionsResponse, problemResponse } from '@/api/v1/responseHeaders'
import buildFeed from '@/lib/caaml/buildFeed'

// Never prerendered: data must not be frozen into the deployment. The CDN
// (s-maxage) is the only cache layer.
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const logPrefix = '[GET /api/v1/bulletins/latest]'
const cacheControl = 'public, max-age=0, s-maxage=60, stale-while-revalidate=300'
const errorTitle = 'Bulletins are temporarily unavailable'

export const GET = async (request: Request) => {
  try {
    const { collection, failures } = buildFeed(await fetchPublicBulletinSources(), new Date())

    // Ids and field names only, never forecast content
    failures.forEach((failure) => console.error(`${logPrefix} bulletin omitted:`, failure))

    if (!collection) return problemResponse(request, errorTitle)

    return cachedResponse({
      body: JSON.stringify(collection),
      cacheControl,
      contentType: 'application/json; charset=utf-8',
      request,
    })
  } catch (error) {
    console.error(`${logPrefix} failed:`, error)

    return problemResponse(request, errorTitle)
  }
}

export const HEAD = GET

export const OPTIONS = () => optionsResponse()
