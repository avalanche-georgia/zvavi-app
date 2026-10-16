import { getMemberName } from '@domain/memberName'
import type { Member } from '@domain/types'
import { type ColumnDef, createColumnHelper } from '@ds/patterns'

import {
  ActionsColumnCell,
  ColumnLabel,
  CreatedColumnCell,
  ExpiresColumnCell,
  JoinedColumnCell,
  MemberColumnCell,
  MemberIdColumnCell,
  StatusColumnCell,
} from './columnCells'

const columnHelper = createColumnHelper<Member>()

const toTime = (value: string | null) => (value ? new Date(value).getTime() : 0)

// Module scope: stable cell / header identities, so rows never remount on re-render.
// Sortable ids match SortKey.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const memberColumns: ColumnDef<Member, any>[] = [
  columnHelper.accessor((member) => getMemberName(member).toLowerCase(), {
    cell: MemberColumnCell,
    enableSorting: true,
    header: () => <ColumnLabel labelKey="name" />,
    id: 'name',
  }),
  columnHelper.display({
    cell: MemberIdColumnCell,
    header: () => <ColumnLabel labelKey="memberId" />,
    id: 'memberId',
    meta: { cellClassName: 'w-40', hideBelow: 'md' },
  }),
  columnHelper.display({
    cell: StatusColumnCell,
    header: () => <ColumnLabel labelKey="status" />,
    id: 'status',
    meta: { cellClassName: 'w-32' },
  }),
  columnHelper.accessor((member) => toTime(member.joinedAt), {
    cell: JoinedColumnCell,
    enableSorting: true,
    header: () => <ColumnLabel labelKey="joinedAt" />,
    id: 'joinedAt',
    meta: { cellClassName: 'w-32', hideBelow: 'md' },
  }),
  columnHelper.accessor((member) => toTime(member.expiresAt), {
    cell: ExpiresColumnCell,
    enableSorting: true,
    header: () => <ColumnLabel labelKey="expiresAt" />,
    id: 'expiresAt',
    meta: { cellClassName: 'w-36' },
  }),
  columnHelper.accessor((member) => toTime(member.createdAt), {
    cell: CreatedColumnCell,
    enableSorting: true,
    header: () => <ColumnLabel labelKey="createdAt" />,
    id: 'createdAt',
    meta: { cellClassName: 'w-32', hideBelow: 'lg' },
  }),
  columnHelper.display({
    cell: ActionsColumnCell,
    header: () => <ColumnLabel isHidden labelKey="actions" />,
    id: 'actions',
    meta: { align: 'end', cellClassName: 'w-24' },
  }),
]
