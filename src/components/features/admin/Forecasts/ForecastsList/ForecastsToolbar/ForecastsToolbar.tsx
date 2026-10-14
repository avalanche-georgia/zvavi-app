import { CountedSegments, ListSearchBox } from '@components/features/admin/shared'
import { useTranslations } from 'next-intl'

import DateRangeFilter from './DateRangeFilter'
import type { ForecastsListState } from '../hooks'
import { type ListStatusFilter, listStatusFilters } from '../model'

type ForecastsToolbarProps = {
  counts: Record<ListStatusFilter, number>
  list: ForecastsListState
  now: Date
  // Bumped by "Clear filters" so the search box drops its text and any pending write
  searchResetKey: number
}

const ForecastsToolbar = ({ counts, list, now, searchResetKey }: ForecastsToolbarProps) => {
  const t = useTranslations()

  const getStatusLabel = (status: ListStatusFilter) => t(`admin.forecasts.filters.status.${status}`)

  return (
    <div className="flex flex-wrap items-center gap-3">
      <CountedSegments
        ariaLabel={t('admin.forecasts.filters.status.label')}
        counts={counts}
        getLabel={getStatusLabel}
        onChange={list.onStatusChange}
        options={listStatusFilters}
        value={list.status}
      />
      <DateRangeFilter list={list} now={now} />
      <ListSearchBox
        label={t('admin.forecasts.filters.search.label')}
        onQueryChange={list.onQueryChange}
        placeholder={t('admin.forecasts.filters.search.placeholder')}
        query={list.query}
        resetKey={searchResetKey}
      />
    </div>
  )
}

export default ForecastsToolbar
