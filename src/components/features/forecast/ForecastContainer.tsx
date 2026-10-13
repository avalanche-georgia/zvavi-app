'use client'

import { Spinner } from '@components/ui'
import { useGetForecast } from '@data/hooks/forecasts'
import type { FullForecast } from '@domain/types'
import { useTranslations } from 'next-intl'

import ForecastPage from './ForecastPage'

type ForecastContainerProps = {
  initialForecast: FullForecast
  isCurrentForecast: boolean
  nextForecastId: number | null
  previousForecastId: number | null
}

// Renders the server-loaded forecast at once and keeps it fresh in the browser
const ForecastContainer = (props: ForecastContainerProps) => {
  const { initialForecast, isCurrentForecast, nextForecastId, previousForecastId } = props
  const t = useTranslations()
  const { data: forecast, isPending } = useGetForecast({
    forecastId: initialForecast.id,
    initialData: initialForecast,
    // The forecast's own region — the one in the URL may be wrong
    regionId: initialForecast.regionId,
  })

  if (isPending || !forecast) {
    return <Spinner label={t('common.labels.wait')} size="lg" />
  }

  return (
    <ForecastPage
      forecast={forecast}
      isCurrentForecast={isCurrentForecast}
      nextForecastId={nextForecastId}
      previousForecastId={previousForecastId}
    />
  )
}

export default ForecastContainer
