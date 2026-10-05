'use client'

import { useState } from 'react'
import { LoadError } from '@components/shared'
import { useAdminGetForecast } from '@data/hooks/forecasts'

import CenteredSpinner from './CenteredSpinner'
import ForecastViewContent from './ForecastViewContent'
import ViewNotFound from './ViewNotFound'

const ForecastView = ({ forecastId }: { forecastId: number }) => {
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

  if (!isValidId) return <ViewNotFound />
  if (isLeaving || isPending) return <CenteredSpinner />
  if (isError) return <LoadError onRetry={handleRetry} />
  if (!forecast) return <ViewNotFound />

  return <ForecastViewContent forecast={forecast} onLeave={handleLeave} />
}

export default ForecastView
