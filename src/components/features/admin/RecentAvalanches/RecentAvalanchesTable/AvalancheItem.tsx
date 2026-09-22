'use client'

import { ConfirmationDialog } from '@components/shared'
import type { AvalancheListItem } from '@data/hooks/recentAvalanches'
import { dateFormat } from '@domain/constants'
import type { RegionId } from '@domain/types'
import { format } from 'date-fns'
import { useTranslations } from 'next-intl'

import ActionButtons from './ActionButtons'
import DescriptionCellContent from './DescriptionCellContent'
import SourceBadge from './SourceBadge'
import StatusBadge from './StatusBadge'
import useAvalancheDeleteDialog from './useAvalancheDeleteDialog'
import useAvalancheStatusToggle from './useAvalancheStatusToggle'

import { routes } from '@/routes'

type AvalancheItemProps = {
  avalanche: AvalancheListItem
  regionId: RegionId
}

const AvalancheItem = ({ avalanche, regionId }: AvalancheItemProps) => {
  const t = useTranslations()

  const {
    createdAt,
    date,
    description,
    id,
    isDateUnknown,
    location,
    size,
    source = 'team',
    status = 'published',
    trigger,
    type,
  } = avalanche

  const { isPending: isTogglingStatus, toggleStatus } = useAvalancheStatusToggle({
    id,
    regionId,
    status,
  })
  const { closeDialog, handleDelete, isOpen, openDialog } = useAvalancheDeleteDialog({
    id,
    regionId,
  })

  const dateDisplay = isDateUnknown
    ? t('admin.forecast.form.recentAvalanches.labels.dateUnknown')
    : date
      ? format(new Date(date), dateFormat)
      : '—'

  return (
    <>
      <div className="flex min-h-14 items-center gap-5 px-4 py-2">
        <div className="w-28 shrink-0 text-sm">{dateDisplay}</div>
        <div className="w-28 shrink-0 text-sm text-gray-600">
          {format(new Date(createdAt), dateFormat)}
        </div>
        <div className="w-28 shrink-0 text-sm">{t(`common.avalancheTypes.${type}`)}</div>
        <div className="flex w-14 shrink-0 justify-center">
          <span className="flex size-6 items-center justify-center rounded-sm bg-gray-200 text-sm font-bold">
            {size}
          </span>
        </div>
        <div className="w-36 shrink-0 text-sm">{t(`common.avalancheTriggers.${trigger}`)}</div>
        <div className="w-36 shrink-0 truncate text-sm text-gray-600">{location ?? '—'}</div>
        <div className="w-20 shrink-0">
          <SourceBadge source={source} />
        </div>
        <div className="w-24 shrink-0">
          <StatusBadge status={status} />
        </div>
        <div className="min-w-0 flex-1 text-sm text-gray-600">
          <DescriptionCellContent description={description} />
        </div>
        <div className="w-28 shrink-0">
          <ActionButtons
            editHref={routes.admin.recentAvalanches.editInRegion(id, regionId)}
            isTogglingStatus={isTogglingStatus}
            onDelete={openDialog}
            onTogglePublish={toggleStatus}
            status={status}
          />
        </div>
      </div>

      <ConfirmationDialog
        description={t('admin.recentAvalanches.actions.deleteDescription')}
        isOpen={isOpen}
        onClose={closeDialog}
        onConfirm={handleDelete}
        title={t('admin.recentAvalanches.actions.deleteTitle')}
        variant="delete"
      />
    </>
  )
}

export default AvalancheItem
