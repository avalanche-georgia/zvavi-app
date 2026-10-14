'use client'

import { useEffect } from 'react'
import { parseIsoDay, useUrlListState } from '@components/features/admin/shared'
import type { DateMode, ListFilterParams } from '@data/hooks/recentAvalanches'
import { useRecentAvalanchesPaginatedQuery } from '@data/hooks/recentAvalanches'
import type { AvalancheSource, RegionId } from '@domain/types'
import { endOfDay, startOfDay } from 'date-fns'

import { type CatalogStatus, readListParams, serializeListParams } from '../model'
import type { AvalanchesListVariant } from '../types'

export const pageSize = 15

// Catalog: everything past moderation. Queue: external submissions awaiting
// review, longest-waiting first (local/observations/model.md).
const variantFilters = {
  catalog: { excludeStatus: 'pending' },
  queue: { isOldestFirst: true, source: 'external', status: 'pending' },
} satisfies Record<AvalanchesListVariant, Partial<ListFilterParams>>

// One page of the region's records (paged and filtered by the server) + the filters
const useAvalanchesListPage = (variant: AvalanchesListVariant, regionId: RegionId) => {
  const { params, setFilters, setParams } = useUrlListState({
    read: readListParams,
    serialize: serializeListParams,
  })
  const { dateFrom, dateMode, dateTo, pageIndex, source, status } = params
  const from = parseIsoDay(dateFrom)
  const to = parseIsoDay(dateTo)
  const catalogFilters =
    variant === 'catalog' ? { source: source ?? undefined, status: status ?? undefined } : {}

  const query = useRecentAvalanchesPaginatedQuery({
    dateFrom: from ? startOfDay(from).toISOString() : undefined,
    dateMode,
    dateTo: to ? endOfDay(to).toISOString() : undefined,
    page: pageIndex + 1,
    pageSize,
    regionId,
    ...variantFilters[variant],
    ...catalogFilters,
  })
  const totalCount = query.data?.totalCount ?? 0
  const lastPageIndex = Math.max(0, Math.ceil(totalCount / pageSize) - 1)
  const isPastLastPage = !!query.data && !query.isPlaceholderData && pageIndex > lastPageIndex

  // A stale page (rows deleted, filters narrowed) would fetch nothing — step back to the last one
  useEffect(() => {
    if (isPastLastPage) setParams({ pageIndex: lastPageIndex })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPastLastPage, lastPageIndex])

  return {
    avalanches: query.data?.avalanches ?? [],
    dateFrom,
    dateMode,
    dateTo,
    hasFilters: !!dateFrom || !!dateTo || (variant === 'catalog' && (!!source || !!status)),
    onDateFromChange: (day: string | null) => setFilters({ dateFrom: day }),
    onDateModeChange: (mode: DateMode) => setFilters({ dateMode: mode }),
    onDateToChange: (day: string | null) => setFilters({ dateTo: day }),
    onFiltersClear: () => setFilters({ dateFrom: null, dateTo: null, source: null, status: null }),
    onPageChange: (nextPageIndex: number) => setParams({ pageIndex: nextPageIndex }),
    onSourceChange: (nextSource: AvalancheSource | null) => setFilters({ source: nextSource }),
    onStatusChange: (nextStatus: CatalogStatus | null) => setFilters({ status: nextStatus }),
    pageIndex,
    query,
    source,
    status,
    totalCount,
  }
}

export type AvalanchesListPage = ReturnType<typeof useAvalanchesListPage>

export default useAvalanchesListPage
