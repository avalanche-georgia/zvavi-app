'use client'

import { Spinner } from '@components/ui'
import { useGetForecast } from '@data/hooks/forecasts'
import type { FullForecast } from '@domain/types'
import { useTranslations } from 'next-intl'

import Forecast from './Forecast'

const ForecastContainer = ({ forecastId }: { forecastId: FullForecast['id'] }) => {
  const t = useTranslations()
  const { data: forecast, isPending } = useGetForecast({ forecastId })

  if (isPending || !forecast) {
    return <Spinner label={t('common.labels.wait')} size="lg" />
  }

  return (
    <div>
      <Forecast forecast={forecast} />
    </div>
  )
}

export default ForecastContainer
