'use client'

import { useRef } from 'react'
import type { RegionId } from '@domain/types'

import useArchiveList from './hooks/useArchiveList'
import useScrollToForecast from './hooks/useScrollToForecast'

import HistoryEmptyState from './HistoryEmptyState'
import HistoryFilters from './HistoryFilters'
import HistoryMonths from './HistoryMonths'
import { type ArchiveForecast, type ArchiveSeason, matchesFilters } from './model'
import SeasonCalendar from './SeasonCalendar'

type SeasonViewProps = {
  regionId: RegionId
  season: ArchiveSeason
}

// One season: the at-a-glance calendar, the sticky filters and the month cards
const SeasonView = ({ regionId, season }: SeasonViewProps) => {
  const filterBarRef = useRef<HTMLDivElement>(null)
  const {
    activeMonths,
    clearFilters,
    dayMap,
    filters,
    months,
    setSort,
    shownCount,
    sort,
    updateFilters,
  } = useArchiveList(season)
  const scrollToForecast = useScrollToForecast({ filterBarRef, onFiltersClear: clearFilters })

  if (season.forecasts.length === 0) {
    return <HistoryEmptyState className="mt-5" regionId={regionId} variant="season" />
  }

  const handleDaySelect = (forecast: ArchiveForecast) =>
    scrollToForecast(forecast.id, !matchesFilters(forecast, filters))

  return (
    <>
      {activeMonths.length > 0 && (
        <SeasonCalendar
          activeMonths={activeMonths}
          dayMap={dayMap}
          filters={filters}
          onDaySelect={handleDaySelect}
          onFiltersChange={updateFilters}
        />
      )}
      <HistoryFilters
        ref={filterBarRef}
        activeMonths={activeMonths}
        filters={filters}
        onFiltersChange={updateFilters}
        onFiltersClear={clearFilters}
        onSortChange={setSort}
        season={season}
        shownCount={shownCount}
        sort={sort}
      />
      {shownCount === 0 ? (
        <HistoryEmptyState className="mt-2" onFiltersClear={clearFilters} variant="filters" />
      ) : (
        <HistoryMonths months={months} problem={filters.problem} regionId={regionId} />
      )}
    </>
  )
}

export default SeasonView
