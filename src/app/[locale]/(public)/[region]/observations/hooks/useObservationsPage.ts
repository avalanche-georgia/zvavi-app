'use client'

import { useMemo } from 'react'
import {
  useObservationPointsQuery,
  usePublicObservationsInfiniteQuery,
} from '@data/hooks/observations'
import type { RegionId } from '@domain/types'

import useDateRange from './useDateRange'
import useObservationLookup from './useObservationLookup'
import useObservationsParams from './useObservationsParams'
import type { ObservationsListState } from '../list/ObservationsListPane'

// Data + URL state for the page. The list is paged (sorted and filtered
// server-side); the map gets every matching point in one lighter request,
// which also carries the region's unfiltered total for "N of M".
const useObservationsPage = (regionId: RegionId) => {
  const { clearFilters, params, setParams } = useObservationsParams()
  const { dateBasis, period, selectedId, sort } = params
  const filters = { dateBasis, ...useDateRange(params), regionId }

  const listQuery = usePublicObservationsInfiniteQuery({ ...filters, sort })
  const { data: pointsData } = useObservationPointsQuery(filters)

  const observations = useMemo(
    () => listQuery.data?.pages.flatMap((page) => page.observations) ?? [],
    [listQuery.data],
  )
  const total = listQuery.data?.pages[0]?.total ?? 0
  const selectedIndex = observations.findIndex((observation) => observation.id === selectedId)
  const selectedObservation = useObservationLookup({
    id: selectedId,
    isListReady: !listQuery.isPending,
    observations,
    regionId,
  })

  // Steps through the filtered list, loading the next page when stepping past
  // the loaded ones
  const handleNavigate = async (offset: number) => {
    const targetIndex = selectedIndex + offset
    const loadedTarget = observations[targetIndex]

    if (loadedTarget) return setParams({ selectedId: loadedTarget.id })
    if (offset < 0 || !listQuery.hasNextPage) return undefined

    const { data } = await listQuery.fetchNextPage()
    const target = data?.pages.flatMap((page) => page.observations)[targetIndex]

    return target ? setParams({ selectedId: target.id }) : undefined
  }

  const list: ObservationsListState = {
    hasFilters: period !== 'all',
    hasNextPage: listQuery.hasNextPage,
    isError: listQuery.isError,
    isFetchingNextPage: listQuery.isFetchingNextPage,
    isNextPageError: listQuery.isFetchNextPageError,
    isPending: listQuery.isPending,
    observations,
    onFetchNextPage: () => listQuery.fetchNextPage(),
    onFiltersClear: clearFilters,
  }

  return {
    list,
    onNavigate: handleNavigate,
    params,
    points: pointsData?.points ?? [],
    regionTotal: pointsData?.regionTotal,
    selectedIndex: selectedIndex === -1 ? null : selectedIndex,
    selectedObservation,
    setParams,
    total,
    visibleCount: listQuery.data ? total : undefined,
  }
}

export default useObservationsPage
