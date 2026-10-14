'use client'

import { useUrlListState } from '@components/features/admin/shared'
import type { DataTableSort } from '@ds/patterns'

import { isSortKey, readListParams, serializeListParams, type StatusFilter } from '../model'

// The list's filters, sort and page, kept in the URL
const useMembersListParams = () => {
  const { params, setFilters, setParams } = useUrlListState({
    read: readListParams,
    serialize: serializeListParams,
  })

  const handleSortChange = ({ desc, id }: DataTableSort) => {
    if (!isSortKey(id)) return
    setFilters({ desc, sortKey: id })
  }

  return {
    ...params,
    onFiltersClear: () => setFilters({ query: '', status: 'all' }),
    onPageChange: (pageIndex: number) => setParams({ pageIndex }),
    onQueryChange: (query: string) => setFilters({ query }),
    onSortChange: handleSortChange,
    onStatusChange: (status: StatusFilter) => setFilters({ status }),
  }
}

export type MembersListState = ReturnType<typeof useMembersListParams>

export default useMembersListParams
