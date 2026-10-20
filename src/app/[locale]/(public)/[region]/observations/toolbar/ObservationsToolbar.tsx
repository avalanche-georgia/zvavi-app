'use client'

import { useRef } from 'react'
import { useIsStuck } from '@components/hooks'
import { SegmentedControl, type ToggleOption } from '@components/ui'
import type { ObservationDateBasis } from '@domain/types'
import { ChipGroup } from '@ds/primitives'
import { List, Map as MapIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'

import CustomRangeFields from './CustomRangeFields'
import SortSelect from './SortSelect'
import {
  type ObservationsFilters,
  type ObservationsPeriod,
  observationsPeriods,
} from '../helpers/searchParams'

import { cn } from '@/lib/utils'

export type ObservationsView = 'list' | 'map'

type ObservationsToolbarProps = {
  filters: ObservationsFilters
  onFiltersChange: (changes: Partial<ObservationsFilters>) => void
  onViewChange: (view: ObservationsView) => void
  ref?: React.Ref<HTMLDivElement>
  view: ObservationsView
}

// Sticky under the app header on mobile, at the top of the scrolling list
// column on desktop. Gets a rule and blur once pinned.
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

  const viewOptions: ToggleOption<ObservationsView>[] = [
    { ariaLabel: t('observations.view.list'), label: <List className="size-4.5" />, value: 'list' },
    {
      ariaLabel: t('observations.view.map'),
      label: <MapIcon className="size-4.5" />,
      value: 'map',
    },
  ]

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
        <div className="flex items-center gap-2">
          <SegmentedControl
            ariaLabel={t('observations.view.label')}
            className="shrink-0 lg:hidden [&>button]:px-2.25"
            onChange={onViewChange}
            options={viewOptions}
            value={view}
          />
          <SegmentedControl
            ariaLabel={t('observations.filters.dateBasis.label')}
            className="min-w-0 flex-1 [&>button]:px-2"
            onChange={handleDateBasisChange}
            options={dateBasisOptions}
            value={filters.dateBasis}
          />
          <SortSelect onChange={(sort) => onFiltersChange({ sort })} value={filters.sort} />
        </div>

        <ChipGroup
          ariaLabel={t('observations.filters.periods.label')}
          // One row that bleeds to the screen edges and scrolls sideways when chips
          // overflow; compact chips for the toolbar
          className="scrollbar-hide *:text-copy-sm -mx-4 flex-nowrap overflow-x-auto px-4 *:h-8.5 *:min-h-0 *:shrink-0 *:whitespace-nowrap"
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
