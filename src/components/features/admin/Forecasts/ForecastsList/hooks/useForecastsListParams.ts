'use client'

import type { DataTableSort } from '@ds/patterns'
import { useSearchParams } from 'next/navigation'

import {
  type DateRange,
  type ForecastsListParams,
  isSortKey,
  type ListStatusFilter,
  readListParams,
  serializeListParams,
} from '../model'

// Filters, sort and page live in the URL so a view can be shared or reloaded.
// history.replaceState (Next syncs it into useSearchParams): no navigation, no server round trip.
const useForecastsListParams = () => {
  const searchParams = useSearchParams()

  // Reads the URL at call time, not render-time params — so the debounced search
  // write can't undo a filter changed meanwhile
  const setParams = (changes: Partial<ForecastsListParams>) => {
    const urlParams = new URLSearchParams(window.location.search)
    const query = serializeListParams({ ...readListParams(urlParams), ...changes }, urlParams)

    window.history.replaceState(null, '', query ? `?${query}` : window.location.pathname)
  }

  // Any filter change starts again from the first page
  const setFilters = (changes: Partial<ForecastsListParams>) =>
    setParams({ ...changes, pageIndex: 0 })

  const handleRangeChange = (range: DateRange) =>
    setFilters(range === 'custom' ? { range } : { dateFrom: null, dateTo: null, range })

  const handleSortChange = ({ desc, id }: DataTableSort) => {
    if (!isSortKey(id)) return
    setFilters({ desc, sortKey: id })
  }

  return {
    ...readListParams(searchParams),
    onDateFromChange: (dateFrom: string | null) => setFilters({ dateFrom }),
    onDateToChange: (dateTo: string | null) => setFilters({ dateTo }),
    onFiltersClear: () =>
      setFilters({ dateFrom: null, dateTo: null, query: '', range: 'all', status: 'all' }),
    onPageChange: (pageIndex: number) => setParams({ pageIndex }),
    onQueryChange: (query: string) => setFilters({ query }),
    onRangeChange: handleRangeChange,
    onSortChange: handleSortChange,
    onStatusChange: (status: ListStatusFilter) => setFilters({ status }),
  }
}

export type ForecastsListState = ReturnType<typeof useForecastsListParams>

export default useForecastsListParams
