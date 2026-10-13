import fetchCurrentForecast from '@data/queries/fetchCurrentForecast'
import fetchTier1Partners from '@data/queries/fetchTier1Partners'
import fetchWeatherStations from '@data/queries/fetchWeatherStations'
import type { Forecast, Partner, PublicObservation, RegionId } from '@domain/types'

import 'server-only'
import fetchPublicObservations from '@/api/observations/fetchPublicObservations'
import { reportServerError } from '@/lib/posthog/server'

const recentAvalanchesLimit = 3

export type RegionHomeData = {
  // null: the region has no published forecast
  forecast: Forecast | null
  partners: Partner[]
  // null: the lookup failed
  recentAvalanches: PublicObservation[] | null
  // null: the lookup failed
  weatherStationsCount: number | null
}

// The latest public observations, in the Observations page's default order.
// A failure only costs the page this list.
const fetchRecentAvalanches = async (regionId: RegionId) => {
  try {
    const { observations } = await fetchPublicObservations({
      dateBasis: 'occurred',
      limit: recentAvalanchesLimit,
      offset: 0,
      regionId,
      sort: 'newest',
    })

    return observations
  } catch (error) {
    reportServerError(error, { region_id: regionId, scope: 'fetchRegionHomeData | observations' })

    return null
  }
}

// Only feeds a quick link's sub-label — not worth an error page
const fetchWeatherStationsCount = async (regionId: RegionId) => {
  try {
    const weatherStations = await fetchWeatherStations()

    return weatherStations.length
  } catch (error) {
    reportServerError(error, {
      region_id: regionId,
      scope: 'fetchRegionHomeData | weather_stations',
    })

    return null
  }
}

const fetchRegionHomeData = async (regionId: RegionId): Promise<RegionHomeData> => {
  const [forecast, partners, recentAvalanches, weatherStationsCount] = await Promise.all([
    fetchCurrentForecast(regionId),
    fetchTier1Partners(),
    fetchRecentAvalanches(regionId),
    fetchWeatherStationsCount(regionId),
  ])

  return { forecast, partners, recentAvalanches, weatherStationsCount }
}

export default fetchRegionHomeData
