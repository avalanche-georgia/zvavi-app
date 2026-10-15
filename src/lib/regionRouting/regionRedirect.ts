import { allRegionIds, regionLocalStorageKey } from '@domain/constants'
import { type NextRequest, NextResponse } from 'next/server'

import getActiveRegionIds from './getActiveRegionIds'

const knownRegions = new Set<string>(allRegionIds)

// Any region the database knows, active or not
export const isKnownRegion = (segment: string) => knownRegions.has(segment)

export const toRegionHome = (regionId: string) => `/${regionId}`

type RegionTarget = {
  // The cookie names a region that isn't active (or doesn't exist) — drop it
  isCookieStale: boolean
  // null: there is a choice to make → the region chooser
  regionId: string | null
}

// The one place that decides which region an entry request lands on:
// 1. the remembered region, if still active
// 2. else the only active region
// 3. else none (the region chooser)
// When the lookup fails, a remembered known region is trusted and nothing is guessed.
const resolveRegionTarget = async (request: NextRequest): Promise<RegionTarget> => {
  const cookieRegion = request.cookies.get(regionLocalStorageKey)?.value ?? null
  const activeIds = await getActiveRegionIds()

  if (!activeIds) {
    const isKnown = cookieRegion !== null && isKnownRegion(cookieRegion)

    return { isCookieStale: false, regionId: isKnown ? cookieRegion : null }
  }

  const isCookieActive = cookieRegion !== null && activeIds.has(cookieRegion)
  const onlyRegion = activeIds.size === 1 ? [...activeIds][0] : null

  return {
    isCookieStale: cookieRegion !== null && !isCookieActive,
    regionId: isCookieActive ? cookieRegion : onlyRegion,
  }
}

// A redirect whose target depends on the visitor (cookie) and on which regions are
// active: temporary (307), never stored by a shared cache
export const regionRedirect = async (
  request: NextRequest,
  toRegionPath: (regionId: string) => string,
  locale: string,
) => {
  const { isCookieStale, regionId } = await resolveRegionTarget(request)
  const path = regionId ? `/${locale}${toRegionPath(regionId)}` : `/${locale}/regions`
  const response = NextResponse.redirect(new URL(path, request.url), 307)

  response.headers.set('Cache-Control', 'private, no-store')
  response.headers.set('Vary', 'Cookie')

  if (isCookieStale) response.cookies.delete(regionLocalStorageKey)

  return response
}
