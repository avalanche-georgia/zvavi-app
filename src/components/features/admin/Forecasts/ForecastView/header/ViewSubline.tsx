import { useListDates } from '@components/features/admin/shared'
import type { AdminForecast } from '@domain/types'
import { useTranslations } from 'next-intl'

const ViewSubline = ({ forecast }: { forecast: AdminForecast }) => {
  const t = useTranslations()
  const { formatTime } = useListDates()
  const { forecaster, regionId, validUntil } = forecast
  const parts = [
    t(`regions.names.${regionId}`),
    forecaster && t('admin.forecasts.view.byForecaster', { name: forecaster }),
    validUntil && t('admin.forecasts.view.untilTime', { time: formatTime(validUntil) }),
  ].filter(Boolean)

  return <p className="text-muted text-copy-sm">{parts.join(' · ')}</p>
}

export default ViewSubline
