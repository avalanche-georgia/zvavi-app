'use client'

import type { AdminForecast } from '@domain/types'
import { Button } from '@ds/primitives'
import { ArrowUp, Copy, ExternalLink, Pencil } from 'lucide-react'
import { useTranslations } from 'next-intl'

import type { ForecastViewActions } from './useForecastViewActions'
import ViewMenu from './ViewMenu'
import { PublishConfirmDialog } from '../../shared'

type ViewActionsProps = {
  actions: ForecastViewActions
  forecast: AdminForecast
}

const ViewActions = ({ actions, forecast }: ViewActionsProps) => {
  const t = useTranslations()
  const isPublished = forecast.status === 'published'

  return (
    <div className="flex flex-wrap items-center gap-2">
      {!isPublished && (
        <Button
          isBusy={actions.isStatusChanging}
          onClick={actions.onPublish}
          size="sm"
          variant="primary"
        >
          <ArrowUp aria-hidden className="size-4" />
          {t('admin.forecasts.actions.publish')}
        </Button>
      )}
      <Button
        isBusy={actions.isEditNavigating}
        onClick={actions.onEdit}
        size="sm"
        variant="secondary"
      >
        <Pencil aria-hidden className="size-4" />
        {t('common.actions.edit')}
      </Button>
      {isPublished && (
        <>
          <Button
            isBusy={actions.isDuplicateNavigating}
            onClick={actions.onDuplicate}
            size="sm"
            variant="secondary"
          >
            <Copy aria-hidden className="size-4" />
            {t('admin.forecasts.actions.duplicate')}
          </Button>
          <Button onClick={actions.onPublicPageOpen} size="sm" variant="secondary">
            {t('admin.forecasts.view.publicPage')}
            <ExternalLink aria-hidden className="size-4" />
          </Button>
        </>
      )}
      <ViewMenu actions={actions} forecastId={forecast.id} isPublished={isPublished} />
      <PublishConfirmDialog
        forecast={forecast}
        isOpen={actions.publishConfirm.isOpen}
        onConfirm={actions.publishConfirm.onConfirm}
        onOpenChange={actions.publishConfirm.onOpenChange}
        regionId={forecast.regionId}
      />
    </div>
  )
}

export default ViewActions
