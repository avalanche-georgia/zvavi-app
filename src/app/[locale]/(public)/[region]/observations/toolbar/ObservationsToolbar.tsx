'use client'

import { useRef } from 'react'
import { useIsStuck } from '@components/hooks'
import { ListMapSwitch, type ListMapView } from '@components/shared'
import type { ObservationDateBasis } from '@domain/types'
import { ChipGroup, SegmentedControl, type ToggleOption } from '@ds/primitives'
import { useTranslations } from 'next-intl'

import CustomRangeFields from './CustomRangeFields'
import SortSelect from './SortSelect'
import {
  type ObservationsFilters,
  type ObservationsPeriod,
  observationsPeriods,
} from '../helpers/searchParams'

import { cn } from '@/lib/utils'

// The page keeps the view state
export type { ListMapView } from '@components/shared'

type ObservationsToolbarProps = {
  filters: ObservationsFilters
  onFiltersChange: (changes: Partial<ObservationsFilters>) => void
  onViewChange: (view: ListMapView) => void
  ref?: React.Ref<HTMLDivElement>
  view: ListMapView
}

// Sticky under the app header on mobile, atop the list column on desktop; ruled once pinned
const ObservationsToolbar = ({
  filters,
  onFiltersChange,
  onViewChange,
  ref,
  view,
}: ObservationsToolbarProps) => {
  const t = useTranslations()
  const sentinelRef = useRef<HTMLDivElement>(null)
  const isStuck = useIsStuck(sentinelRef)

  const dateBasisOptions: ToggleOption<ObservationDateBasis>[] = [
    { label: t('observations.filters.dateBasis.occurred'), value: 'occurred' },
    { label: t('observations.filters.dateBasis.reported'), value: 'reported' },
  ]

  // "Date unknown" only makes sense for the occurrence date
  const periodOptions: ToggleOption<ObservationsPeriod>[] = observationsPeriods
    .filter((period) => period !== 'unknown' || filters.dateBasis === 'occurred')
    .map((period) => ({ label: t(`observations.filters.periods.${period}`), value: period }))

  const handleDateBasisChange = (dateBasis: ObservationDateBasis) =>
    onFiltersChange({
      dateBasis,
      ...(dateBasis === 'reported' && filters.period === 'unknown' && { period: 'all' }),
    })

  const handlePeriodChange = (period: ObservationsPeriod | null) => {
    if (period) onFiltersChange({ period })
  }

  return (
    <>
      <div ref={sentinelRef} aria-hidden="true" className="h-px" />
      <div
        ref={ref}
        className={cn(
          'sticky top-(--split-header-height) z-20 flex flex-col gap-2.5 border-b px-4 pt-2.5 pb-2 lg:top-0',
          isStuck ? 'border-rule bg-canvas/95 backdrop-blur-md' : 'bg-canvas border-transparent',
        )}
      >
        <div className="flex items-center gap-1.5">
          <ListMapSwitch onViewChange={onViewChange} view={view} />
          <SegmentedControl
            ariaLabel={t('observations.filters.dateBasis.label')}
            className="min-w-0 flex-1 [&>button]:flex-auto [&>button]:px-2"
            onChange={handleDateBasisChange}
            options={dateBasisOptions}
            size="sm"
            value={filters.dateBasis}
          />
          <SortSelect onChange={(sort) => onFiltersChange({ sort })} value={filters.sort} />
        </div>

        <ChipGroup
          ariaLabel={t('observations.filters.periods.label')}
          // One row that bleeds to the screen edges and scrolls sideways when chips overflow
          className="scrollbar-hide -mx-4 flex-nowrap overflow-x-auto px-4 *:shrink-0 *:whitespace-nowrap"
          onChange={handlePeriodChange}
          options={periodOptions}
          value={filters.period}
        />

        {filters.period === 'custom' && (
          <CustomRangeFields from={filters.from} onChange={onFiltersChange} to={filters.to} />
        )}
      </div>
    </>
  )
}

export default ObservationsToolbar
