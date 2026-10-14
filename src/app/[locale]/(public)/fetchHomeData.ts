import type { HomeRegion, RegionForecastState } from '@components/features/home'
import fetchActiveRegions from '@data/queries/fetchActiveRegions'
import fetchLatestPublishedForecast from '@data/queries/fetchLatestPublishedForecast'
import fetchTier1Partners from '@data/queries/fetchTier1Partners'
import type { Forecast, Partner, PublicObservation, RegionId } from '@domain/types'
import { isBefore } from 'date-fns'

import 'server-only'
import fetchPublicObservations from '@/api/observations/fetchPublicObservations'
import { reportServerError } from '@/lib/posthog/server'

const latestObservationsLimit = 3

export type HomeData = {
  // null: no region is known (several regions, none picked) or the lookup failed
  latestObservations: { observations: PublicObservation[]; regionId: RegionId } | null
  // Request time — the page's "today", the same for the server and the browser
  now: string
  partners: Partner[]
  regions: HomeRegion[]
}

// Georgia is UTC+4 all year
const tbilisiOffsetMs = 4 * 60 * 60 * 1000
// June (5) → November (10)
const offSeasonMonths = [5, 6, 7, 8, 9, 10]

const isOffSeasonMonth = (now: Date) =>
  offSeasonMonths.includes(new Date(now.getTime() + tbilisiOffsetMs).getUTCMonth())

const getForecastState = (forecast: Forecast | null, now: Date): RegionForecastState => {
  const level = forecast?.hazardLevels.overall ?? '0'

  if (level === '0' && isOffSeasonMonth(now)) return 'offSeason'
  if (!forecast) return 'none'
  if (level === '0') return 'noRating'

  return isBefore(forecast.validUntil, now) ? 'expired' : 'current'
}

// The newest public observations of the one region the reader is looking at.
// A failure only costs the page this section.
const fetchLatestObservations = async (regionId: RegionId | null) => {
  if (!regionId) return null

  try {
    const { observations } = await fetchPublicObservations({
      dateBasis: 'occurred',
      limit: latestObservationsLimit,
      offset: 0,
      regionId,
      sort: 'newest',
    })

    return { observations, regionId }
  } catch (error) {
    reportServerError(error, { region_id: regionId, scope: 'fetchHomeData | observations' })

    return null
  }
}

// selectedRegionId: the region remembered from an earlier visit, if any
const fetchHomeData = async (selectedRegionId: string | null): Promise<HomeData> => {
  const now = new Date()
  const activeRegions = await fetchActiveRegions()
  const [onlyRegion] = activeRegions
  const knownRegion =
    activeRegions.length === 1
      ? onlyRegion
      : activeRegions.find((region) => region.id === selectedRegionId)

  const [forecasts, partners, latestObservations] = await Promise.all([
    Promise.all(activeRegions.map((region) => fetchLatestPublishedForecast(region.id))),
    fetchTier1Partners(),
    fetchLatestObservations(knownRegion?.id ?? null),
  ])

  const regions = activeRegions.map((region, index) => ({
    forecast: forecasts[index],
    region,
    state: getForecastState(forecasts[index], now),
  }))

  return { latestObservations, now: now.toISOString(), partners, regions }
}

export default fetchHomeData
