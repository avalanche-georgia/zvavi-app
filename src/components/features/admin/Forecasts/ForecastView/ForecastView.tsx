'use client'

import { useState } from 'react'
import { Loading, RecordNotFound } from '@components/features/admin/shared'
import { LoadError } from '@components/shared'
import { useAdminGetForecast } from '@data/hooks/forecasts'
import { useTranslations } from 'next-intl'

import ForecastViewContent from './ForecastViewContent'

import { routes } from '@/routes'

const ForecastView = ({ forecastId }: { forecastId: number }) => {
  const t = useTranslations()
  const [isLeaving, setIsLeaving] = useState(false)
  const isValidId = Number.isInteger(forecastId) && forecastId > 0
  const {
    data: forecast,
    isError,
    isPending,
    refetch,
  } = useAdminGetForecast({
    enabled: isValidId,
    forecastId,
    retry: false,
  })

  const handleLeave = () => setIsLeaving(true)
  const handleRetry = () => void refetch()

  const notFound = (
    <RecordNotFound backHref={routes.admin.forecasts.root} message={t('admin.forecast.notFound')} />
  )

  if (!isValidId) return notFound
  if (isLeaving || isPending) return <Loading />
  if (isError && !forecast) return <LoadError onRetry={handleRetry} />
  if (!forecast) return notFound

  return <ForecastViewContent forecast={forecast} onLeave={handleLeave} />
}

export default ForecastView
