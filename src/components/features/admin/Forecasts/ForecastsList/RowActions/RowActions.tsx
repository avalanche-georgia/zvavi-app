'use client'

import type { ForecastListItem, RegionId } from '@domain/types'
import { IconButton } from '@ds/primitives'
import { ArrowUp } from 'lucide-react'
import { useTranslations } from 'next-intl'

import RowMenu from './RowMenu'
import useForecastRowActions from './useForecastRowActions'

type RowActionsProps = {
  forecast: ForecastListItem
  // Card layout: ⋯ only
  isCompact?: boolean
  regionId: RegionId
}

const RowActions = ({ forecast, isCompact = false, regionId }: RowActionsProps) => {
  const t = useTranslations()
  const actions = useForecastRowActions(forecast, regionId)
  const isPublished = forecast.status === 'published'

  return (
    <div className="flex items-center justify-end gap-1">
      {!isPublished && !isCompact && (
        <IconButton aria-label={t('admin.forecasts.actions.publish')} onClick={actions.onPublish}>
          <ArrowUp className="size-4.5" />
        </IconButton>
      )}
      <RowMenu
        actions={actions}
        forecastId={forecast.id}
        isPublished={isPublished}
        withPublish={isCompact}
      />
    </div>
  )
}

export default RowActions
