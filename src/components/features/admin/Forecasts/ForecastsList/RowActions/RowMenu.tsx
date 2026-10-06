'use client'

import { useState } from 'react'
import { ConfirmPopover, IconButton, Menu, MenuItem, MenuSeparator } from '@ds/primitives'
import { ArrowUp, Copy, Ellipsis, LoaderIcon, Pencil, Trash2 } from 'lucide-react'
import { useTranslations } from 'next-intl'

import keepFocusInTable from './keepFocusInTable'
import PublishedMenuItems from './PublishedMenuItems'
import { type ForecastRowActions, useDeleteAfterMenuClose } from '../../shared'

type RowMenuProps = {
  actions: ForecastRowActions
  forecastId: number
  isPublished: boolean
  // ⋯ — also the anchor of the delete confirmation
  triggerRef: React.RefObject<HTMLButtonElement | null>
  // Card layout has no Publish button, so the menu offers it
  withPublish: boolean
}

const RowMenu = ({ actions, forecastId, isPublished, triggerRef, withPublish }: RowMenuProps) => {
  const t = useTranslations()
  const deleteConfirm = useDeleteAfterMenuClose()
  // Like Delete: open the publish dialog only once the menu has fully closed,
  // so the menu's focus return can't fight the dialog's focus trap
  const [isPublishRequested, setIsPublishRequested] = useState(false)

  const handleMenuOpenChangeComplete = (isOpen: boolean) => {
    deleteConfirm.onMenuOpenChangeComplete(isOpen)

    if (isOpen || !isPublishRequested) return
    setIsPublishRequested(false)
    actions.onPublish()
  }

  // These can take the row (and ⋯ with it) out of the list — keep focus in the table
  const keepingFocus = (action: () => Promise<void>) => () => {
    keepFocusInTable(triggerRef.current)
    void action()
  }

  const handleDeleteConfirm = keepingFocus(actions.onDelete)
  const handleUnpublish = keepingFocus(actions.onUnpublish)

  const trigger = (
    <IconButton
      ref={triggerRef}
      aria-label={t('admin.forecasts.actions.moreForForecast', { id: forecastId })}
      tooltip={t('admin.forecasts.actions.more')}
    >
      {actions.isNavigating ? (
        <LoaderIcon className="size-4.5 animate-spin" />
      ) : (
        <Ellipsis className="size-4.5" />
      )}
    </IconButton>
  )

  return (
    <>
      <Menu onOpenChangeComplete={handleMenuOpenChangeComplete} trigger={trigger}>
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
        <MenuSeparator />
        <MenuItem icon={<Trash2 />} onClick={deleteConfirm.onDeleteRequest} tone="danger">
          {t('common.actions.delete')}
        </MenuItem>
      </Menu>

      <ConfirmPopover
        anchor={triggerRef}
        cancelLabel={t('common.actions.cancel')}
        confirmLabel={t('common.actions.delete')}
        isOpen={deleteConfirm.isConfirmOpen}
        message={t('admin.forecasts.deleteConfirm', { id: forecastId })}
        onConfirm={handleDeleteConfirm}
        onOpenChange={deleteConfirm.onConfirmOpenChange}
      />
    </>
  )
}

export default RowMenu
