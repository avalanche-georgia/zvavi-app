'use client'

import { useMemo, useState } from 'react'
import { useAdminForecastsQuery, useGetCurrentForecast } from '@data/hooks/forecasts'
import type { RegionId } from '@domain/types'
import { useNow } from 'next-intl'

import useForecastsListParams from './useForecastsListParams'
import { countByStatus, filterForecasts, getCreatedBounds } from '../model'

// Everything the list page shows: the region's forecasts, the public current one, filters
const useForecastsListPage = (regionId: RegionId) => {
  const list = useForecastsListParams()
  const now = useNow({ updateInterval: 60_000 })
  const [searchResetKey, setSearchResetKey] = useState(0)
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

  const handleFiltersClear = () => {
    setSearchResetKey((key) => key + 1)
    list.onFiltersClear()
  }

  return {
    counts,
    currentQuery,
    forecasts,
    forecastsQuery,
    list: { ...list, onFiltersClear: handleFiltersClear },
    now,
    searchResetKey,
    visibleForecasts,
  }
}

export default useForecastsListPage
