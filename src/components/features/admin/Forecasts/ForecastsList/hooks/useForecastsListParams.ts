'use client'

import { useUrlListState } from '@components/features/admin/shared'
import type { DataTableSort } from '@ds/patterns'
import type { DayRange } from '@ds/primitives'

import {
  type DateRange,
  isSortKey,
  type ListStatusFilter,
  readListParams,
  serializeListParams,
} from '../model'

// The list's filters, sort and page, kept in the URL
const useForecastsListParams = () => {
  const { params, setFilters, setParams } = useUrlListState({
    read: readListParams,
    serialize: serializeListParams,
  })

  const handleRangeChange = (range: DateRange) =>
    setFilters(range === 'custom' ? { range } : { dateFrom: null, dateTo: null, range })

  const handleSortChange = ({ desc, id }: DataTableSort) => {
    if (!isSortKey(id)) return
    setFilters({ desc, sortKey: id })
  }

  return {
    ...params,
    onDatesChange: ({ from, to }: DayRange) => setFilters({ dateFrom: from, dateTo: to }),
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
