'use client'

import { useRef } from 'react'
import { useHeaderHeight, useIsStuck } from '@components/hooks'
import { useTranslations } from 'next-intl'

import LevelChips from './LevelChips'
import ProblemSelect from './ProblemSelect'
import ResultCount from './ResultCount'
import SortButton from './SortButton'
import DateRangeFilter from '../DateRangeFilter'
import {
  type ArchiveFilters,
  type ArchiveSeason,
  type ArchiveSort,
  hasActiveFilters,
} from '../model'

import { cn } from '@/lib/utils'

type HistoryFiltersProps = {
  activeMonths: string[]
  filters: ArchiveFilters
  onFiltersChange: (changes: Partial<ArchiveFilters>) => void
  onFiltersClear: VoidFunction
  onSortChange: (sort: ArchiveSort) => void
  ref?: React.Ref<HTMLDivElement>
  season: ArchiveSeason
  shownCount: number
  sort: ArchiveSort
}

// Sticky under the app header; gets a rule once pinned
const HistoryFilters = ({
  activeMonths,
  filters,
  onFiltersChange,
  onFiltersClear,
  onSortChange,
  ref,
  season,
  shownCount,
  sort,
}: HistoryFiltersProps) => {
  const t = useTranslations()
  const sentinelRef = useRef<HTMLDivElement>(null)
  const isStuck = useIsStuck(sentinelRef)
  const headerHeight = useHeaderHeight()

  return (
    <>
      <div ref={sentinelRef} aria-hidden className="mt-3" />
      <div
        ref={ref}
        aria-label={t('forecast.history.filters.label')}
        className={cn(
          'bg-canvas sticky z-20 -mx-4 flex flex-col gap-2.5 border-b px-4 pt-3 pb-2.5 transition-colors sm:-mx-6 sm:px-6',
          isStuck ? 'border-rule' : 'border-transparent',
        )}
        role="group"
        style={{ top: headerHeight }}
      >
        <LevelChips
          forecasts={season.forecasts}
          levels={filters.levels}
          onLevelsChange={(levels) => onFiltersChange({ levels })}
        />
        <div className="flex flex-wrap items-center gap-2">
          <DateRangeFilter
            activeMonths={activeMonths}
            from={filters.from}
            onRangeChange={onFiltersChange}
            season={season}
            to={filters.to}
          />
          <ProblemSelect
            forecasts={season.forecasts}
            onProblemChange={(problem) => onFiltersChange({ problem })}
            problem={filters.problem}
          />
          <SortButton onSortChange={onSortChange} sort={sort} />
          <ResultCount
            isFiltered={hasActiveFilters(filters)}
            onFiltersClear={onFiltersClear}
            shownCount={shownCount}
            totalCount={season.forecasts.length}
          />
        </div>
      </div>
    </>
  )
}

export default HistoryFilters
