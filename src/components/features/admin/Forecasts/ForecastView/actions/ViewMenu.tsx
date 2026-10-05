'use client'

import { useRef } from 'react'
import { ConfirmPopover, IconButton, Menu, MenuItem, MenuSeparator } from '@ds/primitives'
import { Copy, Ellipsis, EyeOff, Link2, Trash2 } from 'lucide-react'
import { useTranslations } from 'next-intl'

import type { ForecastViewActions } from './useForecastViewActions'
import { useDeleteAfterMenuClose } from '../../shared'

type ViewMenuProps = {
  actions: ForecastViewActions
  forecastId: number
  isPublished: boolean
}

const ViewMenu = ({ actions, forecastId, isPublished }: ViewMenuProps) => {
  const t = useTranslations()
  const triggerRef = useRef<HTMLButtonElement>(null)
  const deleteConfirm = useDeleteAfterMenuClose()

  const trigger = (
    <IconButton ref={triggerRef} aria-label={t('admin.forecasts.actions.more')}>
      <Ellipsis className="size-4.5" />
    </IconButton>
  )

  return (
    <>
      <Menu onOpenChangeComplete={deleteConfirm.onMenuOpenChangeComplete} trigger={trigger}>
        {isPublished ? (
          <>
            <MenuItem icon={<Link2 />} onClick={actions.onLinkCopy}>
              {t('admin.forecasts.actions.copyLink')}
            </MenuItem>
            <MenuItem icon={<EyeOff />} onClick={actions.onUnpublish}>
              {t('admin.forecasts.actions.unpublish')}
            </MenuItem>
          </>
        ) : (
          <MenuItem icon={<Copy />} onClick={actions.onDuplicate}>
            {t('admin.forecasts.actions.duplicate')}
          </MenuItem>
        )}
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
        onConfirm={actions.onDelete}
        onOpenChange={deleteConfirm.onConfirmOpenChange}
      />
    </>
  )
}

export default ViewMenu
