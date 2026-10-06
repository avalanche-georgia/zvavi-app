import type { ForecastListItem } from '@domain/types'
import { type ColumnDef, createColumnHelper } from '@ds/patterns'

import {
  ActionsColumnCell,
  ColumnLabel,
  CreatedColumnCell,
  ForecastColumnCell,
  HazardColumnCell,
  PublishedColumnCell,
  StatusColumnCell,
  ValidUntilColumnCell,
} from './columnCells'

const columnHelper = createColumnHelper<ForecastListItem>()

const toTime = (value: string | null) => (value ? new Date(value).getTime() : 0)

// Module scope: stable cell / header identities, so rows never remount on re-render.
// Sortable ids match SortKey.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const forecastColumns: ColumnDef<ForecastListItem, any>[] = [
  columnHelper.accessor((forecast) => Number(forecast.hazardLevels.overall), {
    cell: HazardColumnCell,
    enableSorting: true,
    header: () => <ColumnLabel labelKey="hazard" />,
    id: 'hazard',
    meta: { cellClassName: 'w-28' },
  }),
  columnHelper.display({
    cell: ForecastColumnCell,
    header: () => <ColumnLabel labelKey="forecast" />,
    id: 'forecast',
  }),
  columnHelper.accessor((forecast) => toTime(forecast.validUntil), {
    cell: ValidUntilColumnCell,
    enableSorting: true,
    header: () => <ColumnLabel labelKey="validUntil" />,
    id: 'validUntil',
    meta: { cellClassName: 'w-36' },
  }),
  columnHelper.display({
    cell: PublishedColumnCell,
    header: () => <ColumnLabel labelKey="publishedAt" />,
    id: 'publishedAt',
    meta: { cellClassName: 'w-32', hideBelow: 'md' },
  }),
  columnHelper.accessor((forecast) => toTime(forecast.createdAt), {
    cell: CreatedColumnCell,
    enableSorting: true,
    header: () => <ColumnLabel labelKey="createdAt" />,
    id: 'createdAt',
    meta: { cellClassName: 'w-32', hideBelow: 'lg' },
  }),
  columnHelper.display({
    cell: StatusColumnCell,
    header: () => <ColumnLabel labelKey="status" />,
    id: 'status',
    meta: { cellClassName: 'w-28' },
  }),
  columnHelper.display({
    cell: ActionsColumnCell,
    header: () => <ColumnLabel isHidden labelKey="actions" />,
    id: 'actions',
    meta: { align: 'end', cellClassName: 'w-24' },
  }),
]
