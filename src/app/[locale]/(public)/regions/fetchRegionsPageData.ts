import type { RegionsPageRegion } from '@components/features/home'
import fetchLatestPublishedForecast from '@data/queries/fetchLatestPublishedForecast'
import fetchTier1Partners from '@data/queries/fetchTier1Partners'
import { getForecastState } from '@domain/forecastState'
import type { Partner, Region, RegionId } from '@domain/types'

import 'server-only'
import { reportServerError } from '@/lib/posthog/server'

export type RegionsPageData = {
  // Request time — the page's "today", the same for the server and the browser
  now: string
  partners: Partner[]
  regions: RegionsPageRegion[]
}

// A failed lookup only costs that region its danger (shown as "no forecasts yet"),
// not the whole page
const fetchRegionForecast = async (regionId: RegionId) => {
  try {
    return await fetchLatestPublishedForecast(regionId)
  } catch (error) {
    reportServerError(error, { region_id: regionId, scope: 'fetchRegionsPageData | forecast' })

    return null
  }
}

const fetchRegionsPageData = async (regions: Region[]): Promise<RegionsPageData> => {
  const now = new Date()

  const [forecasts, partners] = await Promise.all([
    Promise.all(regions.map((region) => fetchRegionForecast(region.id))),
    fetchTier1Partners(),
  ])

  return {
    now: now.toISOString(),
    partners,
    regions: regions.map((region, index) => ({
      forecast: forecasts[index],
      region,
      state: getForecastState(forecasts[index], now),
    })),
  }
}

export default fetchRegionsPageData
