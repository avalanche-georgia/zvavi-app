'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'

import { useGetForecast } from '@/data/hooks/forecasts'

import { Spinner } from '@/UI/components'
import Forecast from './Forecast'

import type { FullForecast } from '@/business/types'

const ForecastContainer = ({ forecastId }: { forecastId: FullForecast['id'] }) => {
  const t = useTranslations()
  const { data: forecastData, isPending } = useGetForecast({ forecastId })
  const [forecast, setForecast] = useState<FullForecast>()

  useEffect(() => {
    if (!forecastData) return

    setForecast(forecastData)
  }, [forecastData])

  if (isPending) return <Spinner label={t('common.labels.wait')} size="lg" />

  if (!forecast) return null

  return (
    <div>
      <Forecast forecast={forecast} />
    </div>
  )
}

export default ForecastContainer
