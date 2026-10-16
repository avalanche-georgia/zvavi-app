import fetchPublicRegionZones from '@data/queries/fetchPublicRegionZones'

import { cachedResponse, optionsResponse, problemResponse } from '@/api/v1/responseHeaders'
import buildRegionsGeoJson from '@/lib/caaml/geojson'
import { reportServerError } from '@/lib/posthog/server'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const logPrefix = '[GET /api/v1/regions]'
const cacheControl = 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400'
const errorTitle = 'Regions are temporarily unavailable'
const scope = 'api/v1/regions'

export const GET = async (request: Request) => {
  try {
    const regions = await fetchPublicRegionZones()
    const { featureCollection, omittedRegionIds } = buildRegionsGeoJson(regions)

    if (omittedRegionIds.length) {
      console.error(`${logPrefix} regions omitted (missing or invalid zone):`, omittedRegionIds)
      reportServerError(new Error('regions omitted: missing or invalid zone'), {
        regionIds: omittedRegionIds.join(','),
        scope,
      })
    }

    // Regions exist but none could be served: fail rather than look empty
    if (regions.length && !featureCollection.features.length) {
      return problemResponse(request, errorTitle)
    }

    return cachedResponse({
      body: JSON.stringify(featureCollection),
      cacheControl,
      contentType: 'application/geo+json; charset=utf-8',
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
