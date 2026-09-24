'use client'

import { useRef } from 'react'
import { ChipGroup, SegmentedControl, type ToggleOption } from '@components/ui'
import type { ObservationDateBasis } from '@domain/types'
import { List, Map as MapIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'

import CustomRangeFields from './CustomRangeFields'
import SortSelect from './SortSelect'
import useIsStuck from './useIsStuck'
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

  const periodOptions: ToggleOption<ObservationsPeriod>[] = observationsPeriods.map((period) => ({
    label: t(`observations.filters.periods.${period}`),
    value: period,
  }))

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
            onChange={(dateBasis) => onFiltersChange({ dateBasis })}
            options={dateBasisOptions}
            value={filters.dateBasis}
          />
          <SortSelect onChange={(sort) => onFiltersChange({ sort })} value={filters.sort} />
        </div>

        <ChipGroup
          ariaLabel={t('observations.filters.periods.label')}
          // Bleeds to the screen edges so it can scroll sideways when chips overflow
          className="-mx-4 px-4"
          onChange={(period) => onFiltersChange({ period })}
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
