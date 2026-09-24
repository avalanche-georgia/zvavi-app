'use client'

import { useEffect, useMemo } from 'react'
import {
  useObservationPointsQuery,
  usePublicObservationsInfiniteQuery,
} from '@data/hooks/observations'
import type { PublicObservation, RegionId } from '@domain/types'

import useDateRange from './useDateRange'
import useObservationLookup from './useObservationLookup'
import useObservationsParams from './useObservationsParams'

export type ObservationsListState = {
  hasFilters: boolean
  hasNextPage: boolean
  isError: boolean
  isFetchingNextPage: boolean
  isNextPageError: boolean
  isPending: boolean
  // Previous filter's results, shown while the new ones load
  isStale: boolean
  // Loaded pages, in display order
  observations: PublicObservation[]
  onFetchNextPage: VoidFunction
  onFiltersClear: VoidFunction
}

// Offset paging shifts by one when a report is published or removed between
// page loads — the same observation can then arrive on two pages
const uniqueById = (observations: PublicObservation[]) => {
  const seen = new Set<number>()

  return observations.filter(({ id }) => {
    if (seen.has(id)) return false

    seen.add(id)

    return true
  })
}

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
    () => uniqueById(listQuery.data?.pages.flatMap((page) => page.observations) ?? []),
    [listQuery.data],
  )
  const total = listQuery.data?.pages[0]?.total ?? 0
  const selectedIndex = observations.findIndex((observation) => observation.id === selectedId)
  const { isNotFound, observation: selectedObservation } = useObservationLookup({
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
    if (offset < 0 || !listQuery.hasNextPage || listQuery.isFetchingNextPage) return undefined

    const { data } = await listQuery.fetchNextPage()
    const target = uniqueById(data?.pages.flatMap((page) => page.observations) ?? [])[targetIndex]

    // Only if the user is still on the same observation — they may have closed
    // the sheet or moved on while the page loaded
    const isStillSelected =
      new URLSearchParams(window.location.search).get('id') === String(selectedId)

    return target && isStillSelected ? setParams({ selectedId: target.id }) : undefined
  }

  // A link to an observation that doesn't exist (anymore) — drop it from the URL
  useEffect(() => {
    if (isNotFound) setParams({ selectedId: null })
  }, [isNotFound]) // eslint-disable-line react-hooks/exhaustive-deps

  const list: ObservationsListState = {
    hasFilters: period !== 'all',
    hasNextPage: listQuery.hasNextPage,
    isError: listQuery.isError,
    isFetchingNextPage: listQuery.isFetchingNextPage,
    isNextPageError: listQuery.isFetchNextPageError,
    isPending: listQuery.isPending,
    isStale: listQuery.isPlaceholderData,
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
