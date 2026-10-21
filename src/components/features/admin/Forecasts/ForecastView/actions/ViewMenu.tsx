'use client'

import { RecordMenu } from '@components/features/admin/shared'
import { MenuItem } from '@ds/primitives'
import { Copy, EyeOff, Link2 } from 'lucide-react'
import { useTranslations } from 'next-intl'

import type { ForecastViewActions } from './useForecastViewActions'

type ViewMenuProps = {
  actions: ForecastViewActions
  forecastId: number
  isPublished: boolean
}

const ViewMenu = ({ actions, forecastId, isPublished }: ViewMenuProps) => {
  const t = useTranslations()

  return (
    <RecordMenu
      deleteMessage={t('admin.forecasts.deleteMessage', { id: forecastId })}
      deleteTitle={t('admin.forecasts.deleteTitle', { id: forecastId })}
      isBusy={actions.isDeleting || actions.isNavigating}
      label={t('admin.shared.actions.more')}
      onDelete={actions.onDelete}
    >
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
    </RecordMenu>
  )
}

export default ViewMenu
