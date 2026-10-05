import type { Forecast } from '@domain/types'

import type { ForecastListStatus } from '../../shared'

// live: what the public site shows now, still valid. expired: what the public site
// shows now, validity over (it keeps showing it). superseded: published, but a newer
// published forecast is current. draft: not public.
export type ForecastViewStatus = 'draft' | 'expired' | 'live' | 'superseded'

type ViewForecast = Pick<Forecast, 'createdAt' | 'id' | 'status' | 'validUntil'>
type CurrentForecast = Pick<Forecast, 'createdAt' | 'id'> | null

// Public rule (fetchCurrentForecast): the latest created published forecast in the
// region. Comparing createdAt keeps this right while `current` refetches after a toggle.
const isCurrent = (forecast: ViewForecast, currentForecast: CurrentForecast) =>
  !currentForecast ||
  currentForecast.id === forecast.id ||
  new Date(forecast.createdAt) > new Date(currentForecast.createdAt)

export const getViewStatus = (
  forecast: ViewForecast,
  currentForecast: CurrentForecast,
  now: Date,
): ForecastViewStatus => {
  if (forecast.status !== 'published') return 'draft'
  if (!isCurrent(forecast, currentForecast)) return 'superseded'

  const isValid = Boolean(forecast.validUntil) && new Date(forecast.validUntil) > now

  return isValid ? 'live' : 'expired'
}

const listStatusByViewStatus: Record<ForecastViewStatus, ForecastListStatus> = {
  draft: 'draft',
  expired: 'current',
  live: 'current',
  superseded: 'published',
}

export const toListStatus = (status: ForecastViewStatus) => listStatusByViewStatus[status]
