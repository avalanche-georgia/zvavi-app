'use client'

import { ListEmptyState, useDataTableLabels } from '@components/features/admin/shared'
import type { ForecastListItem, RegionId } from '@domain/types'
import { DataTable } from '@ds/patterns'
import { useTranslations } from 'next-intl'

import { forecastColumns } from './columns'
import ForecastCard from './ForecastCard'
import { ForecastsTableContext } from './ForecastsTableContext'
import type { ForecastsListState } from '../hooks'

type ForecastsTableProps = {
  currentForecastId: number | null
  forecasts: ForecastListItem[]
  hasForecasts: boolean
  isLoading: boolean
  list: ForecastsListState
  now: Date
  regionId: RegionId
}

const pageSize = 15

const getRowId = ({ id }: ForecastListItem) => String(id)
const renderCard = (forecast: ForecastListItem) => <ForecastCard forecast={forecast} />

const ForecastsTable = ({
  currentForecastId,
  forecasts,
  hasForecasts,
  isLoading,
  list,
  now,
  regionId,
}: ForecastsTableProps) => {
  const t = useTranslations()
  const labels = useDataTableLabels()
  const regionName = t(`regions.names.${regionId}`)

  // Filters hide every row vs. the region has no forecasts at all
  const empty = hasForecasts ? (
    <ListEmptyState
      hint={t('admin.forecasts.empty.noMatchesHint')}
      onFiltersClear={list.onFiltersClear}
      title={t('admin.forecasts.empty.noMatchesTitle')}
    />
  ) : (
    <ListEmptyState
      hint={t('admin.forecasts.empty.noForecastsHint')}
      title={t('admin.forecasts.empty.noForecastsTitle', { region: regionName })}
    />
  )

  const getRowClassName = ({ id }: ForecastListItem) =>
    id === currentForecastId ? 'bg-success-soft/40 hover:bg-success-soft/60' : undefined

  return (
    <ForecastsTableContext value={{ currentForecastId, now, regionId }}>
      <DataTable
        ariaLabel={t('admin.forecasts.list.ariaLabel', { region: regionName })}
        columns={forecastColumns}
        data={forecasts}
        empty={empty}
        getRowClassName={getRowClassName}
        getRowId={getRowId}
        isLoading={isLoading}
        labels={labels}
        onPageChange={list.onPageChange}
        onSortChange={list.onSortChange}
        pageIndex={list.pageIndex}
        pageSize={pageSize}
        renderCard={renderCard}
        sort={{ desc: list.desc, id: list.sortKey }}
      />
    </ForecastsTableContext>
  )
}

export default ForecastsTable
