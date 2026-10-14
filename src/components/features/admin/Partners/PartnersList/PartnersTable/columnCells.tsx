import type { Partner } from '@domain/types'
import type { CellContext } from '@ds/patterns'
import { useTranslations } from 'next-intl'

import { usePartnersTable } from './PartnersTableContext'
import { StatusBadge } from '../../shared'
import PartnerCell from '../PartnerCell'
import RowActions from '../RowActions'

type RowCellProps = CellContext<Partner, unknown>

export type ColumnLabelKey = 'actions' | 'benefit' | 'name' | 'status' | 'tier'

type ColumnLabelProps = { isHidden?: boolean; labelKey: ColumnLabelKey }

export const ColumnLabel = ({ isHidden, labelKey }: ColumnLabelProps) => {
  const t = useTranslations()
  const label = t(`admin.partners.list.columns.${labelKey}`)

  return isHidden ? <span className="sr-only">{label}</span> : label
}

export const PartnerColumnCell = ({ row }: RowCellProps) => {
  const { onPartnerOpen } = usePartnersTable()

  return <PartnerCell onOpen={onPartnerOpen} partner={row.original} />
}

export const BenefitColumnCell = ({ row }: RowCellProps) => {
  const { benefitEn } = row.original

  if (!benefitEn) return <span className="text-placeholder">—</span>

  return <p className="text-body truncate">{benefitEn}</p>
}

// "1 · Summit"
export const TierColumnCell = ({ row }: RowCellProps) => {
  const t = useTranslations()
  const { tier } = row.original

  return (
    <span className="whitespace-nowrap">
      <span className="font-semibold tabular-nums">{tier}</span>
      <span className="text-muted">{` · ${t(`partners.levels.${tier}`)}`}</span>
    </span>
  )
}

export const StatusColumnCell = ({ row }: RowCellProps) => (
  <StatusBadge isActive={row.original.isActive} />
)

export const ActionsColumnCell = ({ row }: RowCellProps) => {
  const { onPartnerOpen } = usePartnersTable()

  return <RowActions onOpen={onPartnerOpen} partner={row.original} />
}
