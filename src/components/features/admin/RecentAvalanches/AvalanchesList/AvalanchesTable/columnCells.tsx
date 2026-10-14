import { useListDates } from '@components/features/admin/shared'
import { SizeTile } from '@components/features/observations'
import type { AvalancheListItem } from '@data/hooks/recentAvalanches'
import type { CellContext } from '@ds/patterns'
import { useTranslations } from 'next-intl'

import { useAvalanchesTable } from './AvalanchesTableContext'
import { SourceBadge, StatusBadge } from '../../shared'
import AvalancheCell from '../AvalancheCell'
import RowActions from '../RowActions'
import SubmitterCell from '../SubmitterCell'
import useOccurredLabel from '../useOccurredLabel'

type RowCellProps = CellContext<AvalancheListItem, unknown>

export type ColumnLabelKey =
  | 'actions'
  | 'date'
  | 'size'
  | 'source'
  | 'status'
  | 'submitted'
  | 'submitter'
  | 'type'

type ColumnLabelProps = { isHidden?: boolean; labelKey: ColumnLabelKey }

export const ColumnLabel = ({ isHidden, labelKey }: ColumnLabelProps) => {
  const t = useTranslations()
  const label = t(`admin.recentAvalanches.list.columns.${labelKey}`)

  return isHidden ? <span className="sr-only">{label}</span> : label
}

export const SizeColumnCell = ({ row }: RowCellProps) => (
  <SizeTile isCompact size={row.original.size} />
)

export const AvalancheColumnCell = ({ row }: RowCellProps) => {
  const { onAvalancheOpen } = useAvalanchesTable()

  return <AvalancheCell avalanche={row.original} onOpen={onAvalancheOpen} />
}

export const OccurredColumnCell = ({ row }: RowCellProps) => {
  const getOccurredLabel = useOccurredLabel()

  return <span className="font-medium tabular-nums">{getOccurredLabel(row.original)}</span>
}

// When the public report came in — the queue is worked oldest first
export const SubmittedColumnCell = ({ row }: RowCellProps) => {
  const { formatDate, formatTime } = useListDates()
  const { createdAt } = row.original

  return (
    <div className="flex flex-col tabular-nums">
      <span className="font-medium">{formatDate(createdAt)}</span>
      <span className="text-caption text-muted">{formatTime(createdAt)}</span>
    </div>
  )
}

export const SourceColumnCell = ({ row }: RowCellProps) => (
  <SourceBadge source={row.original.source ?? 'team'} />
)

export const SubmitterColumnCell = ({ row }: RowCellProps) => (
  <SubmitterCell avalanche={row.original} />
)

export const StatusColumnCell = ({ row }: RowCellProps) => (
  <StatusBadge status={row.original.status ?? 'published'} />
)

export const ActionsColumnCell = ({ row }: RowCellProps) => {
  const { onAvalancheOpen, regionId } = useAvalanchesTable()

  return <RowActions avalanche={row.original} onOpen={onAvalancheOpen} regionId={regionId} />
}
