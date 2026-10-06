import type { ForecastListItem } from '@domain/types'
import type { CellContext } from '@ds/patterns'
import { useTranslations } from 'next-intl'

import { useForecastsTable } from './ForecastsTableContext'
import { getForecastListStatus, StatusBadge, useListDates } from '../../shared'
import { ForecastCell, HazardCell, PublishedCell, ValidUntilCell } from '../cells'
import { RowActions } from '../RowActions'

type RowCellProps = CellContext<ForecastListItem, unknown>

export type ColumnLabelKey =
  | 'actions'
  | 'createdAt'
  | 'forecast'
  | 'hazard'
  | 'publishedAt'
  | 'status'
  | 'validUntil'

type ColumnLabelProps = { isHidden?: boolean; labelKey: ColumnLabelKey }

export const ColumnLabel = ({ isHidden, labelKey }: ColumnLabelProps) => {
  const t = useTranslations()
  const label = t(`admin.forecasts.list.columns.${labelKey}`)

  return isHidden ? <span className="sr-only">{label}</span> : label
}

export const HazardColumnCell = ({ row }: RowCellProps) => (
  <HazardCell hazardLevels={row.original.hazardLevels} />
)

export const ForecastColumnCell = ({ row }: RowCellProps) => (
  <ForecastCell forecast={row.original} />
)

export const ValidUntilColumnCell = ({ row }: RowCellProps) => {
  const { now } = useForecastsTable()

  return <ValidUntilCell now={now} validUntil={row.original.validUntil} />
}

export const PublishedColumnCell = ({ row }: RowCellProps) => (
  <PublishedCell publishedAt={row.original.publishedAt} />
)

export const CreatedColumnCell = ({ row }: RowCellProps) => {
  const { formatDate } = useListDates()

  return <span className="font-medium tabular-nums">{formatDate(row.original.createdAt)}</span>
}

export const StatusColumnCell = ({ row }: RowCellProps) => {
  const { currentForecastId } = useForecastsTable()

  return <StatusBadge status={getForecastListStatus(row.original, currentForecastId)} />
}

export const ActionsColumnCell = ({ row }: RowCellProps) => {
  const { regionId } = useForecastsTable()

  return <RowActions forecast={row.original} regionId={regionId} />
}
