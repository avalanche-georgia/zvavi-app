'use client'

import type { ForecastListItem, RegionId } from '@domain/types'
import { DataTable, type DataTableLabels } from '@ds/patterns'
import { useTranslations } from 'next-intl'

import { forecastColumns } from './columns'
import ForecastCard from './ForecastCard'
import ForecastsEmptyState from './ForecastsEmptyState'
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

  const labels: DataTableLabels = {
    nextPage: t('common.table.nextPage'),
    previousPage: t('common.table.previousPage'),
    rowRange: (range) => t('common.table.rowRange', range),
  }

  const getRowClassName = ({ id }: ForecastListItem) =>
    id === currentForecastId ? 'bg-success-soft/40 hover:bg-success-soft/60' : undefined

  return (
    <ForecastsTableContext value={{ currentForecastId, now, regionId }}>
      <DataTable
        ariaLabel={t('admin.forecasts.list.ariaLabel', { region: t(`regions.names.${regionId}`) })}
        columns={forecastColumns}
        data={forecasts}
        empty={
          <ForecastsEmptyState
            hasForecasts={hasForecasts}
            onFiltersClear={list.onFiltersClear}
            regionId={regionId}
          />
        }
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
