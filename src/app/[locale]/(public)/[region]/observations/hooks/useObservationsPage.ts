'use client'

import { useMemo } from 'react'
import { usePublicObservationsQuery } from '@data/hooks/observations'
import type { RegionId } from '@domain/types'

import useDateRange from './useDateRange'
import useObservationsParams from './useObservationsParams'
import sortObservations from '../helpers/sortObservations'

// Data + URL state for the page. The filtered list is fetched with the date
// filter applied server-side; the unfiltered list (same cache entry when no
// filter is active) gives the "N of M" total and resolves linked observations
// that fall outside the current filter.
const useObservationsPage = (regionId: RegionId) => {
  const { clearFilters, params, setParams } = useObservationsParams()
  const { dateBasis, period, selectedId, sort } = params
  const dateRange = useDateRange(params)

  // Without a period filter both lists hold the same rows (only the client-side
  // order differs) — share one request instead of fetching everything twice
  const allQuery = usePublicObservationsQuery({ dateBasis: 'occurred', regionId })
  const periodQuery = usePublicObservationsQuery({
    dateBasis,
    ...dateRange,
    enabled: period !== 'all',
    regionId,
  })
  const filteredQuery = period === 'all' ? allQuery : periodQuery

  const observations = useMemo(
    () => sortObservations(filteredQuery.data ?? [], dateBasis, sort),
    [filteredQuery.data, dateBasis, sort],
  )

  const selectedIndex = observations.findIndex((observation) => observation.id === selectedId)
  const selectedObservation =
    observations[selectedIndex] ??
    allQuery.data?.find((observation) => observation.id === selectedId) ??
    null

  return {
    clearFilters,
    hasFilters: period !== 'all',
    isError: filteredQuery.isError,
    isPending: filteredQuery.isPending,
    observations,
    params,
    selectedIndex: selectedIndex === -1 ? null : selectedIndex,
    selectedObservation,
    setParams,
    total: allQuery.data?.length,
    visibleCount: filteredQuery.data?.length,
  }
}

export default useObservationsPage
