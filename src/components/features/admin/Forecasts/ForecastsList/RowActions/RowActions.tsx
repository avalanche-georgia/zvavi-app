'use client'

import { useRef } from 'react'
import type { ForecastListItem, RegionId } from '@domain/types'
import { IconButton } from '@ds/primitives'
import { ArrowUp } from 'lucide-react'
import { useTranslations } from 'next-intl'

import keepFocusInTable from './keepFocusInTable'
import RowMenu from './RowMenu'
import { PublishConfirmDialog, useForecastRowActions } from '../../shared'

type RowActionsProps = {
  forecast: ForecastListItem
  // Card layout: ⋯ only
  isCompact?: boolean
  regionId: RegionId
}

const RowActions = ({ forecast, isCompact = false, regionId }: RowActionsProps) => {
  const t = useTranslations()
  const actions = useForecastRowActions(forecast, regionId)
  const menuTriggerRef = useRef<HTMLButtonElement>(null)
  const { id, status } = forecast
  const isPublished = status === 'published'

  // The Publish button goes away with the draft status — carry on from ⋯ (or the table,
  // if the row leaves the current filter)
  const handlePublishConfirm = () => {
    keepFocusInTable(menuTriggerRef.current)
    void actions.publishConfirm.onConfirm()
  }

  return (
    <div className="flex items-center justify-end gap-1">
      {!isPublished && !isCompact && (
        <IconButton
          aria-label={t('admin.forecasts.actions.publishForecast', { id })}
          onClick={actions.onPublish}
          tooltip={t('admin.forecasts.actions.publish')}
        >
          <ArrowUp className="size-4.5" />
        </IconButton>
      )}
      <RowMenu
        actions={actions}
        forecastId={id}
        isPublished={isPublished}
        triggerRef={menuTriggerRef}
        withPublish={isCompact}
      />
      <PublishConfirmDialog
        finalFocus={menuTriggerRef}
        forecast={forecast}
        isOpen={actions.publishConfirm.isOpen}
        onConfirm={handlePublishConfirm}
        onOpenChange={actions.publishConfirm.onOpenChange}
        regionId={regionId}
      />
    </div>
  )
}

export default RowActions
