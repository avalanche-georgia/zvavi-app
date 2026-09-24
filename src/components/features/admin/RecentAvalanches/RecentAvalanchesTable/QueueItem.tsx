'use client'

import { dateTimeFormat } from '@domain/constants'
import { format } from 'date-fns'
import { useTranslations } from 'next-intl'

import ActionButtons from './ActionButtons'
import OpenAvalancheLink from './OpenAvalancheLink'
import RowDeleteDialog from './RowDeleteDialog'
import SizeBadge from './SizeBadge'
import SubmitterCell from './SubmitterCell'
import type { AvalancheRowProps } from './types'
import useAvalancheRow from './useAvalancheRow'

// Moderation queue row — triage at a glance, review in the side panel
const QueueItem = ({ avalanche, onOpen, regionId }: AvalancheRowProps) => {
  const t = useTranslations()
  const { createdAt, id, size, type } = avalanche
  const { dateDisplay, deleteDialog, isTogglingStatus, status, toggleStatus } = useAvalancheRow(
    avalanche,
    regionId,
  )

  return (
    <>
      <div className="flex min-h-14 items-center gap-5 px-4 py-2">
        <div className="w-36 shrink-0">
          <OpenAvalancheLink id={id} onOpen={onOpen}>
            {format(createdAt, dateTimeFormat)}
          </OpenAvalancheLink>
        </div>
        <div className="w-28 shrink-0 text-sm">{dateDisplay}</div>
        <div className="w-36 shrink-0 text-sm">{t(`common.avalancheTypes.${type}`)}</div>
        <div className="flex w-14 shrink-0 justify-center">
          <SizeBadge size={size} />
        </div>
        <div className="min-w-0 flex-1">
          <SubmitterCell avalanche={avalanche} />
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

export default QueueItem
