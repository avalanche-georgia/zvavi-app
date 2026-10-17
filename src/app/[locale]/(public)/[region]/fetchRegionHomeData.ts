import fetchForecasterProfile from '@data/queries/fetchForecasterProfile'
import fetchLatestPublishedForecast from '@data/queries/fetchLatestPublishedForecast'
import fetchTier1Partners from '@data/queries/fetchTier1Partners'
import fetchWeatherStations from '@data/queries/fetchWeatherStations'
import { getForecastState, type RegionForecastState } from '@domain/forecastState'
import type { Forecast, Partner, PublicObservation, RegionId, TeamMember } from '@domain/types'

import 'server-only'
import fetchPublicObservations from '@/api/observations/fetchPublicObservations'
import { reportServerError } from '@/lib/posthog/server'

const recentAvalanchesLimit = 3

export type RegionHomeData = {
  // null: the region has no published forecast
  forecast: Forecast | null
  forecasterProfile: TeamMember | null
  partners: Partner[]
  // null: the lookup failed
  recentAvalanches: PublicObservation[] | null
  // Same rule as the region chooser
  state: RegionForecastState
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

// The forecast, then its forecaster's profile — chained so the other lookups
// don't wait for it
const fetchForecastWithForecaster = async (regionId: RegionId) => {
  const forecast = await fetchLatestPublishedForecast(regionId)
  const forecasterProfile = forecast ? await fetchForecasterProfile(forecast) : null

  return { forecast, forecasterProfile }
}

const fetchRegionHomeData = async (regionId: RegionId): Promise<RegionHomeData> => {
  const [{ forecast, forecasterProfile }, partners, recentAvalanches, weatherStationsCount] =
    await Promise.all([
      fetchForecastWithForecaster(regionId),
      fetchTier1Partners(),
      fetchRecentAvalanches(regionId),
      fetchWeatherStationsCount(regionId),
    ])

  return {
    forecast,
    forecasterProfile,
    partners,
    recentAvalanches,
    state: getForecastState(forecast, new Date()),
    weatherStationsCount,
  }
}

export default fetchRegionHomeData
