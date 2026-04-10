'use client'

import { StaleForecastBanner } from '@components/shared'
import { Spinner } from '@components/ui'
import { useGetForecast } from '@data/hooks/forecasts'
import type { FullForecast } from '@domain/types'
import { useTranslations } from 'next-intl'

import Forecast from './Forecast'

type ForecastContainerProps = {
  initialForecast: FullForecast
  isCurrentForecast: boolean
}

const ForecastContainer = ({ initialForecast, isCurrentForecast }: ForecastContainerProps) => {
  const t = useTranslations()
  const { data: forecast, isPending } = useGetForecast({
    forecastId: initialForecast.id,
    initialData: initialForecast,
  })

  if (isPending || !forecast) {
    return <Spinner label={t('common.labels.wait')} size="lg" />
  }

  return (
    <div>
      {!isCurrentForecast && <StaleForecastBanner />}
      <Forecast forecast={forecast} />
    </div>
  )
}

export default ForecastContainer
