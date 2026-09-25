'use client'

import { useTranslations } from 'next-intl'

import ActionButtons from './ActionButtons'
import OpenAvalancheLink from './OpenAvalancheLink'
import RowDeleteDialog from './RowDeleteDialog'
import SizeBadge from './SizeBadge'
import SourceBadge from './SourceBadge'
import StatusBadge from './StatusBadge'
import SubmitterCell from './SubmitterCell'
import type { AvalancheRowProps } from './types'
import useAvalancheRow from './useAvalancheRow'

// Catalog row — the rest of the record is in the side panel
const AvalancheItem = ({ avalanche, onOpen, regionId }: AvalancheRowProps) => {
  const t = useTranslations()
  const { id, size, source = 'team', type } = avalanche
  const { dateDisplay, deleteDialog, isTogglingStatus, status, toggleStatus } = useAvalancheRow(
    avalanche,
    regionId,
  )

  return (
    <>
      <div className="flex min-h-14 items-center gap-5 px-4 py-2">
        <div className="w-28 shrink-0">
          <OpenAvalancheLink id={id} onOpen={onOpen}>
            {dateDisplay}
          </OpenAvalancheLink>
        </div>
        <div className="w-36 shrink-0 text-sm">{t(`common.avalancheTypes.${type}`)}</div>
        <div className="flex w-14 shrink-0 justify-center">
          <SizeBadge size={size} />
        </div>
        <div className="w-24 shrink-0">
          <SourceBadge source={source} />
        </div>
        <div className="w-40 shrink-0">
          <SubmitterCell avalanche={avalanche} />
        </div>
        <div className="min-w-0 flex-1">
          <StatusBadge status={status} />
        </div>
        <div className="w-28 shrink-0">
          <ActionButtons
            isTogglingStatus={isTogglingStatus}
            onDelete={deleteDialog.openDialog}
            onEdit={() => onOpen(id, 'edit')}
            onStatusToggle={toggleStatus}
            status={status}
          />
        </div>
      </div>

      <RowDeleteDialog
        isOpen={deleteDialog.isOpen}
        onClose={deleteDialog.closeDialog}
        onConfirm={deleteDialog.handleDelete}
      />
    </>
  )
}

export default AvalancheItem
