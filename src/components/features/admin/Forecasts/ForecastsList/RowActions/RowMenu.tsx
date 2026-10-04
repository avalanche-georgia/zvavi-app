'use client'

import { useRef, useState } from 'react'
import { ConfirmPopover, IconButton, Menu, MenuItem, MenuSeparator } from '@ds/primitives'
import { ArrowUp, Copy, Ellipsis, LoaderIcon, Pencil, Trash2 } from 'lucide-react'
import { useTranslations } from 'next-intl'

import PublishedMenuItems from './PublishedMenuItems'
import type { ForecastRowActions } from './useForecastRowActions'

type RowMenuProps = {
  actions: ForecastRowActions
  forecastId: number
  isPublished: boolean
  // Card layout has no Publish button, so the menu offers it
  withPublish: boolean
}

const RowMenu = ({ actions, forecastId, isPublished, withPublish }: RowMenuProps) => {
  const t = useTranslations()
  const triggerRef = useRef<HTMLButtonElement>(null)
  const [isDeleteRequested, setIsDeleteRequested] = useState(false)
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false)

  const handleDeleteRequest = () => setIsDeleteRequested(true)

  // Open the confirmation only once the menu has fully closed and handed focus back
  // to ⋯ — otherwise the closing menu's focus return closes the popover again
  const handleMenuOpenChangeComplete = (isOpen: boolean) => {
    if (isOpen || !isDeleteRequested) return
    setIsDeleteRequested(false)
    setIsDeleteConfirmOpen(true)
  }

  const trigger = (
    <IconButton ref={triggerRef} aria-label={t('admin.forecasts.actions.more')}>
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
          <MenuItem icon={<ArrowUp />} onClick={actions.onPublish}>
            {t('admin.forecasts.actions.publish')}
          </MenuItem>
        )}
        {isPublished && <PublishedMenuItems actions={actions} />}
        <MenuSeparator />
        <MenuItem icon={<Trash2 />} onClick={handleDeleteRequest} tone="danger">
          {t('common.actions.delete')}
        </MenuItem>
      </Menu>

      <ConfirmPopover
        anchor={triggerRef}
        cancelLabel={t('common.actions.cancel')}
        confirmLabel={t('common.actions.delete')}
        isOpen={isDeleteConfirmOpen}
        message={t('admin.forecasts.deleteConfirm', { id: forecastId })}
        onConfirm={actions.onDelete}
        onOpenChange={setIsDeleteConfirmOpen}
      />
    </>
  )
}

export default RowMenu
