import fetchPublicRegionZones from '@data/queries/fetchPublicRegionZones'

import { cachedResponse, optionsResponse, problemResponse } from '../responseHeaders'

import buildRegionsGeoJson from '@/lib/caaml/geojson'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const logPrefix = '[GET /api/v1/regions]'
const cacheControl = 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400'
const errorTitle = 'Regions are temporarily unavailable'

export const GET = async (request: Request) => {
  try {
    const regions = await fetchPublicRegionZones()
    const { featureCollection, omittedRegionIds } = buildRegionsGeoJson(regions)

    if (omittedRegionIds.length) {
      console.error(`${logPrefix} regions omitted (missing or invalid zone):`, omittedRegionIds)
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

    return problemResponse(request, errorTitle)
  }
}

export const HEAD = GET

export const OPTIONS = () => optionsResponse()
