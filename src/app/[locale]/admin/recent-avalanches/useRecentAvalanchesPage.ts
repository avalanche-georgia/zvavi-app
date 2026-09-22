'use client'

import { useCallback } from 'react'
import type { DateMode } from '@data/hooks/recentAvalanches'
import { useRecentAvalanchesPaginatedQuery } from '@data/hooks/recentAvalanches'
import { defaultRegionId } from '@domain/constants'
import type { RegionId } from '@domain/types'
import { endOfDay, startOfDay } from 'date-fns'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'src/i18n/navigation'

const pageSize = 15

const useRecentAvalanchesPage = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const regionId = (searchParams.get('regionId') as RegionId) ?? defaultRegionId
  const page = Math.max(1, Number(searchParams.get('page')) || 1)
  const dateMode = (searchParams.get('dateMode') as DateMode) || 'occurred'
  const dateFromParam = searchParams.get('dateFrom')
  const dateToParam = searchParams.get('dateTo')

  const dateFrom = dateFromParam ? new Date(dateFromParam) : null
  const dateTo = dateToParam ? new Date(dateToParam) : null

  const { data, isPending } = useRecentAvalanchesPaginatedQuery({
    dateFrom: dateFromParam ?? undefined,
    dateMode,
    dateTo: dateToParam ?? undefined,
    page,
    pageSize: pageSize,
    regionId,
  })

  const updateParams = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString())

      for (const [key, value] of Object.entries(updates)) {
        if (value === null) {
          params.delete(key)
        } else {
          params.set(key, value)
        }
      }

      router.push(`?${params.toString()}`)
    },
    [router, searchParams],
  )

  const updateFilters = useCallback(
    (updates: Record<string, string | null>) => updateParams({ ...updates, page: '1' }),
    [updateParams],
  )

  const handlePageChange = useCallback(
    (newPage: number) => updateParams({ page: String(newPage) }),
    [updateParams],
  )

  const handleDateModeChange = useCallback(
    (mode: DateMode) => updateFilters({ dateMode: mode }),
    [updateFilters],
  )

  const handleDateFromChange = useCallback(
    (date: Date | null) =>
      updateFilters({ dateFrom: date ? startOfDay(date).toISOString() : null }),
    [updateFilters],
  )

  const handleDateToChange = useCallback(
    (date: Date | null) => updateFilters({ dateTo: date ? endOfDay(date).toISOString() : null }),
    [updateFilters],
  )

  const handleFiltersReset = useCallback(
    () => updateFilters({ dateFrom: null, dateTo: null }),
    [updateFilters],
  )

  const totalPages = data ? Math.max(1, Math.ceil(data.totalCount / pageSize)) : 1
  const clampedPage = Math.min(page, totalPages)

  if (!isPending && data && clampedPage !== page) {
    updateParams({ page: String(clampedPage) })
  }

  return {
    avalanches: data?.avalanches ?? [],
    dateFrom,
    dateMode,
    dateTo,
    grandTotal: data?.grandTotal ?? 0,
    isPending,
    onDateFromChange: handleDateFromChange,
    onDateModeChange: handleDateModeChange,
    onDateToChange: handleDateToChange,
    onFiltersReset: handleFiltersReset,
    onPageChange: handlePageChange,
    page: clampedPage,
    totalPages,
  }
}

export default useRecentAvalanchesPage
