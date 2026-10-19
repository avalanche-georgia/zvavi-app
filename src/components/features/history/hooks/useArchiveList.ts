'use client'

import { useMemo, useState } from 'react'

import {
  type ArchiveFilters,
  type ArchiveSeason,
  type ArchiveSort,
  buildDayMap,
  emptyFilters,
  getActiveMonths,
  groupByMonth,
  matchesFilters,
  sortForecasts,
} from '../model'

// Filters and sort of one season's list. The season view is keyed by season,
// so switching seasons starts from a clean state.
const useArchiveList = ({ forecasts }: ArchiveSeason) => {
  const [filters, setFilters] = useState<ArchiveFilters>(emptyFilters)
  const [sort, setSort] = useState<ArchiveSort>('desc')

  const activeMonths = useMemo(() => getActiveMonths(forecasts), [forecasts])
  const dayMap = useMemo(() => buildDayMap(forecasts), [forecasts])

  const shown = forecasts.filter((forecast) => matchesFilters(forecast, filters))
  const months = groupByMonth(sortForecasts(shown, sort))

  const updateFilters = (changes: Partial<ArchiveFilters>) =>
    setFilters((current) => ({ ...current, ...changes }))

  const clearFilters = () => setFilters(emptyFilters)

  return {
    activeMonths,
    clearFilters,
    dayMap,
    filters,
    months,
    setSort,
    shownCount: shown.length,
    sort,
    updateFilters,
  }
}

export default useArchiveList
