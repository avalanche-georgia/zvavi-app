import fetchPublicBulletinSources from '@data/queries/fetchPublicBulletinSources'

import { cachedResponse, optionsResponse, problemResponse } from '@/api/v1/responseHeaders'
import type { BulletinFailure } from '@/lib/caaml/buildFeed'
import buildFeed from '@/lib/caaml/buildFeed'
import { reportServerError } from '@/lib/posthog/server'

// Never prerendered: data must not be frozen into the deployment. The CDN
// (s-maxage) is the only cache layer.
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const logPrefix = '[GET /api/v1/bulletins/latest]'
const cacheControl = 'public, max-age=0, s-maxage=60, stale-while-revalidate=300'
const errorTitle = 'Bulletins are temporarily unavailable'
const scope = 'api/v1/bulletins/latest'

// Ids and field names only, never forecast content. The region is omitted —
// never replaced by an older published forecast.
const reportFailure = ({ forecastId, reason, regionId, stack }: BulletinFailure) => {
  const error = new Error(`invalid forecast: ${reason}`)

  if (stack) error.stack = stack

  console.error(`${logPrefix} invalid forecast ${forecastId}: ${reason}`, {
    regionId,
    ...(stack && { stack }),
  })
  reportServerError(error, { forecastId, regionId, scope })
}

export const GET = async (request: Request) => {
  try {
    const { collection, failures } = buildFeed(await fetchPublicBulletinSources(), new Date())

    failures.forEach(reportFailure)

    if (!collection) return problemResponse(request, errorTitle)

    return cachedResponse({
      body: JSON.stringify(collection),
      cacheControl,
      contentType: 'application/json; charset=utf-8',
      request,
    })
  } catch (error) {
    console.error(`${logPrefix} failed:`, error)
    reportServerError(error, { scope })

    return problemResponse(request, errorTitle)
  }
}

export const HEAD = GET

export const OPTIONS = () => optionsResponse()
