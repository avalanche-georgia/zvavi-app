'use client'

import { RecordMenu } from '@components/features/admin/shared'
import { formatAvalancheId } from '@components/features/observations'
import { Icon } from '@components/icons'
import type { AvalancheListItem } from '@data/hooks/recentAvalanches'
import type { RegionId } from '@domain/types'
import { IconButton, MenuItem } from '@ds/primitives'
import { Pencil } from 'lucide-react'
import { useTranslations } from 'next-intl'

import type { OnAvalancheOpen } from './types'
import { getStatusToggle, useAvalancheDelete, useAvalancheStatusToggle } from '../hooks'

type RowActionsProps = {
  avalanche: AvalancheListItem
  // Card layout: ⋯ only
  isCompact?: boolean
  onOpen: OnAvalancheOpen
  regionId: RegionId
}

// Quick status action (approve / publish / unpublish) + ⋯ with edit and delete
const RowActions = ({ avalanche, isCompact = false, onOpen, regionId }: RowActionsProps) => {
  const t = useTranslations()
  const { id, status = 'published' } = avalanche
  const statusToggle = getStatusToggle(status)
  const { isPending: isTogglingStatus, toggleStatus } = useAvalancheStatusToggle({ id, status })
  const { handleDelete } = useAvalancheDelete({ id, regionId })
  const recordId = formatAvalancheId(id)

  return (
    <div className="flex items-center justify-end gap-1">
      {statusToggle && !isCompact && (
        <IconButton
          aria-label={`${t(statusToggle.labelKey)} ${recordId}`}
          disabled={isTogglingStatus}
          onClick={toggleStatus}
          tooltip={t(statusToggle.labelKey)}
        >
          <Icon icon={statusToggle.icon} size="sm" />
        </IconButton>
      )}
      <RecordMenu
        deleteMessage={t('admin.recentAvalanches.sheet.deleteConfirm')}
        label={t('admin.recentAvalanches.actions.moreForRecord', { id: recordId })}
        onDelete={handleDelete}
      >
        {statusToggle && isCompact && (
          <MenuItem icon={<Icon icon={statusToggle.icon} size="sm" />} onClick={toggleStatus}>
            {t(statusToggle.labelKey)}
          </MenuItem>
        )}
        <MenuItem icon={<Pencil />} onClick={() => onOpen(id, 'edit')}>
          {t('common.actions.edit')}
        </MenuItem>
      </RecordMenu>
    </div>
  )
}

export default RowActions
