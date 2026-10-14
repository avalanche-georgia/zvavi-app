import type { Partner } from '@domain/types'
import { type ColumnDef, createColumnHelper } from '@ds/patterns'

import {
  ActionsColumnCell,
  BenefitColumnCell,
  ColumnLabel,
  PartnerColumnCell,
  StatusColumnCell,
  TierColumnCell,
} from './columnCells'

const columnHelper = createColumnHelper<Partner>()

// Module scope: stable cell / header identities, so rows never remount on re-render.
// Sortable ids match SortKey.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const partnerColumns: ColumnDef<Partner, any>[] = [
  columnHelper.accessor((partner) => partner.nameEn.toLowerCase(), {
    cell: PartnerColumnCell,
    enableSorting: true,
    header: () => <ColumnLabel labelKey="name" />,
    id: 'name',
    // Ascending on the first click, like the default order
    sortDescFirst: false,
  }),
  columnHelper.display({
    cell: BenefitColumnCell,
    header: () => <ColumnLabel labelKey="benefit" />,
    id: 'benefit',
    meta: { hideBelow: 'md' },
  }),
  columnHelper.accessor('tier', {
    cell: TierColumnCell,
    enableSorting: true,
    header: () => <ColumnLabel labelKey="tier" />,
    id: 'tier',
    meta: { cellClassName: 'w-40' },
    sortDescFirst: false,
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
    meta: { align: 'end', cellClassName: 'w-16' },
  }),
]
