'use client'

import { StaleForecastBanner } from '@components/shared'
import { Spinner } from '@components/ui'
import { useGetForecast } from '@data/hooks/forecasts'
import { regionIds } from '@domain/constants'
import type { FullForecast } from '@domain/types'
import { useTranslations } from 'next-intl'

import Forecast from './Forecast'

type ForecastContainerProps = {
  initialForecast: FullForecast
  isCurrentForecast: boolean
}

const ForecastContainer = ({ initialForecast, isCurrentForecast }: ForecastContainerProps) => {
  const t = useTranslations()
  // TODO(PR 4): replace with regionId from RegionContext
  const regionIdMock = regionIds.gudauri
  const { data: forecast, isPending } = useGetForecast({
    forecastId: initialForecast.id,
    initialData: initialForecast,
    regionId: regionIdMock,
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
