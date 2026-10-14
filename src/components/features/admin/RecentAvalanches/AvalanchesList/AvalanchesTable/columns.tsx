import type { AvalancheListItem } from '@data/hooks/recentAvalanches'
import { type ColumnDef, createColumnHelper } from '@ds/patterns'

import {
  ActionsColumnCell,
  AvalancheColumnCell,
  CatalogAvalancheColumnCell,
  ColumnLabel,
  OccurredColumnCell,
  SizeColumnCell,
  SourceColumnCell,
  StatusColumnCell,
  SubmittedColumnCell,
  SubmitterColumnCell,
} from './columnCells'
import type { AvalanchesListVariant } from '../types'

const columnHelper = createColumnHelper<AvalancheListItem>()

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AvalancheColumn = ColumnDef<AvalancheListItem, any>

const sizeColumn = columnHelper.display({
  cell: SizeColumnCell,
  header: () => <ColumnLabel labelKey="size" />,
  id: 'size',
  meta: { cellClassName: 'w-18' },
})

const avalancheHeader = () => <ColumnLabel labelKey="type" />

const actionsColumn = columnHelper.display({
  cell: ActionsColumnCell,
  header: () => <ColumnLabel isHidden labelKey="actions" />,
  id: 'actions',
  meta: { align: 'end', cellClassName: 'w-24' },
})

// Module scope: stable cell / header identities, so rows never remount on re-render.
// The server sets the order (newest first; the queue oldest first), so nothing sorts here.
export const avalancheColumns: Record<AvalanchesListVariant, AvalancheColumn[]> = {
  catalog: [
    sizeColumn,
    columnHelper.display({ cell: CatalogAvalancheColumnCell, header: avalancheHeader, id: 'type' }),
    columnHelper.display({
      cell: OccurredColumnCell,
      header: () => <ColumnLabel labelKey="date" />,
      id: 'date',
      meta: { cellClassName: 'w-32' },
    }),
    columnHelper.display({
      cell: SourceColumnCell,
      header: () => <ColumnLabel labelKey="source" />,
      id: 'source',
      meta: { cellClassName: 'w-28', hideBelow: 'md' },
    }),
    columnHelper.display({
      cell: SubmitterColumnCell,
      header: () => <ColumnLabel labelKey="submitter" />,
      id: 'submitter',
      meta: { cellClassName: 'w-48', hideBelow: 'lg' },
    }),
    columnHelper.display({
      cell: StatusColumnCell,
      header: () => <ColumnLabel labelKey="status" />,
      id: 'status',
      meta: { cellClassName: 'w-32' },
    }),
    actionsColumn,
  ],
  queue: [
    sizeColumn,
    columnHelper.display({ cell: AvalancheColumnCell, header: avalancheHeader, id: 'type' }),
    columnHelper.display({
      cell: SubmittedColumnCell,
      header: () => <ColumnLabel labelKey="submitted" />,
      id: 'submitted',
      meta: { cellClassName: 'w-36' },
    }),
    columnHelper.display({
      cell: OccurredColumnCell,
      header: () => <ColumnLabel labelKey="date" />,
      id: 'date',
      meta: { cellClassName: 'w-32', hideBelow: 'md' },
    }),
    columnHelper.display({
      cell: SubmitterColumnCell,
      header: () => <ColumnLabel labelKey="submitter" />,
      id: 'submitter',
      meta: { cellClassName: 'w-56' },
    }),
    actionsColumn,
  ],
}
