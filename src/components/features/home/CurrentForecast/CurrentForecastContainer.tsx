'use client'

import { Spinner } from '@components/ui'
import { useGetCurrentForecast } from '@data/hooks/forecasts'

import CurrentForecast from './CurrentForecast'

const CurrentForecastContainer = () => {
  const { data: forecast, isPending } = useGetCurrentForecast({ isShort: true })

  if (isPending) {
    return (
      <div className="relative h-[209px]">
        <Spinner />
      </div>
    )
  }

  if (!forecast) return <div aria-hidden className="h-[209px]" />

  return <CurrentForecast forecast={forecast} />
}

export default CurrentForecastContainer
