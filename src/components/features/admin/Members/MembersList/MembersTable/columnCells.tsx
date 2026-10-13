import { useListDates } from '@components/features/admin/shared'
import type { Member } from '@domain/types'
import type { CellContext } from '@ds/patterns'
import { useTranslations } from 'next-intl'

import { useMembersTable } from './MembersTableContext'
import { StatusBadge } from '../../shared'
import { ExpiresCell, MemberCell } from '../cells'
import RowActions from '../RowActions'

type RowCellProps = CellContext<Member, unknown>

export type ColumnLabelKey =
  | 'actions'
  | 'createdAt'
  | 'expiresAt'
  | 'joinedAt'
  | 'memberId'
  | 'name'
  | 'status'

type ColumnLabelProps = { isHidden?: boolean; labelKey: ColumnLabelKey }

export const ColumnLabel = ({ isHidden, labelKey }: ColumnLabelProps) => {
  const t = useTranslations()
  const label = t(`admin.members.list.columns.${labelKey}`)

  return isHidden ? <span className="sr-only">{label}</span> : label
}

export const MemberColumnCell = ({ row }: RowCellProps) => {
  const { onMemberOpen } = useMembersTable()

  return <MemberCell member={row.original} onOpen={onMemberOpen} />
}

export const MemberIdColumnCell = ({ row }: RowCellProps) => (
  <span className="text-body font-mono">{row.original.memberId}</span>
)

export const StatusColumnCell = ({ row }: RowCellProps) => (
  <StatusBadge status={row.original.status} />
)

export const JoinedColumnCell = ({ row }: RowCellProps) => {
  const { formatDate } = useListDates()

  return <span className="font-medium tabular-nums">{formatDate(row.original.joinedAt)}</span>
}

export const ExpiresColumnCell = ({ row }: RowCellProps) => (
  <ExpiresCell expiresAt={row.original.expiresAt} />
)

export const CreatedColumnCell = ({ row }: RowCellProps) => {
  const { formatDate } = useListDates()

  return <span className="tabular-nums">{formatDate(row.original.createdAt)}</span>
}

export const ActionsColumnCell = ({ row }: RowCellProps) => {
  const { onMemberOpen } = useMembersTable()

  return <RowActions member={row.original} onOpen={onMemberOpen} />
}
