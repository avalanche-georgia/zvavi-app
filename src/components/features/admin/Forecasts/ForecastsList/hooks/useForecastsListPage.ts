'use client'

import { useMemo } from 'react'
import { useSearchReset } from '@components/features/admin/shared'
import { useAdminForecastsQuery, useGetCurrentForecast } from '@data/hooks/forecasts'
import type { RegionId } from '@domain/types'
import { useNow } from 'next-intl'

import useForecastsListParams from './useForecastsListParams'
import { countByStatus, filterForecasts, getCreatedBounds } from '../model'

// Everything the list page shows: the region's forecasts, the public current one, filters
const useForecastsListPage = (regionId: RegionId) => {
  const list = useForecastsListParams()
  const now = useNow({ updateInterval: 60_000 })
  const { onFiltersClear, searchResetKey } = useSearchReset(list.onFiltersClear)
  const forecastsQuery = useAdminForecastsQuery(regionId)
  // Same query as the public pages: "current" here always matches the public site
  const currentQuery = useGetCurrentForecast({ isShort: true, regionId })
  const forecasts = useMemo(() => forecastsQuery.data ?? [], [forecastsQuery.data])
  const { dateFrom, dateTo, query, range, status } = list

  // Stable identities: the table re-sorts and re-paginates only when these change
  const visibleForecasts = useMemo(() => {
    const bounds = getCreatedBounds({ dateFrom, dateTo, now, range })

    return filterForecasts(forecasts, { bounds, query, status })
  }, [dateFrom, dateTo, forecasts, now, query, range, status])
  const counts = useMemo(() => countByStatus(forecasts), [forecasts])

  return {
    counts,
    currentQuery,
    forecasts,
    forecastsQuery,
    list: { ...list, onFiltersClear },
    now,
    searchResetKey,
    visibleForecasts,
  }
}

export default useForecastsListPage
