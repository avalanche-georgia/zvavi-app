'use client'

import { useState } from 'react'
import { keepFocusInTable, RecordMenu } from '@components/features/admin/shared'
import { MenuItem } from '@ds/primitives'
import { ArrowUp, Copy, Pencil } from 'lucide-react'
import { useTranslations } from 'next-intl'

import PublishedMenuItems from './PublishedMenuItems'
import type { ForecastRowActions } from '../../shared'

type RowMenuProps = {
  actions: ForecastRowActions
  forecastId: number
  isPublished: boolean
  // ⋯ — the row moves focus here once the publish dialog closes
  triggerRef: React.RefObject<HTMLButtonElement | null>
  // Card layout has no Publish button, so the menu offers it
  withPublish: boolean
}

const RowMenu = ({ actions, forecastId, isPublished, triggerRef, withPublish }: RowMenuProps) => {
  const t = useTranslations()
  // Like Delete: open the publish dialog only once the menu has fully closed,
  // so the menu's focus return can't fight the dialog's focus trap
  const [isPublishRequested, setIsPublishRequested] = useState(false)

  const handleMenuOpenChangeComplete = (isOpen: boolean) => {
    if (isOpen || !isPublishRequested) return
    setIsPublishRequested(false)
    actions.onPublish()
  }

  // Unpublishing can take the row (and ⋯ with it) out of the list — keep focus in the table
  const handleUnpublish = () => {
    keepFocusInTable(triggerRef.current)
    void actions.onUnpublish()
  }

  return (
    <RecordMenu
      deleteMessage={t('admin.forecasts.deleteConfirm', { id: forecastId })}
      isBusy={actions.isNavigating}
      label={t('admin.forecasts.actions.moreForForecast', { id: forecastId })}
      onDelete={actions.onDelete}
      onOpenChangeComplete={handleMenuOpenChangeComplete}
      triggerRef={triggerRef}
    >
      <MenuItem icon={<Pencil />} onClick={actions.onEdit}>
        {t('common.actions.edit')}
      </MenuItem>
      <MenuItem icon={<Copy />} onClick={actions.onDuplicate}>
        {t('admin.forecasts.actions.duplicate')}
      </MenuItem>
      {withPublish && !isPublished && (
        <MenuItem icon={<ArrowUp />} onClick={() => setIsPublishRequested(true)}>
          {t('admin.forecasts.actions.publish')}
        </MenuItem>
      )}
      {isPublished && <PublishedMenuItems actions={actions} onUnpublish={handleUnpublish} />}
    </RecordMenu>
  )
}

export default RowMenu
