'use client'

import { Spinner } from '@components/ui'
import { useGetCurrentForecast } from '@data/hooks/forecasts'
import { useRegionContext } from '@domain/context/RegionContext'

import CurrentForecast from './CurrentForecast'

const CurrentForecastContainer = () => {
  const { region } = useRegionContext()
  const { data: forecast, isPending } = useGetCurrentForecast({
    isShort: true,
    regionId: region!.id,
  })

  if (isPending) {
    return (
      <div className="relative h-[229px]">
        <Spinner />
      </div>
    )
  }

  if (!forecast) return <div aria-hidden className="h-[229px]" />

  return <CurrentForecast forecast={forecast} />
}

export default CurrentForecastContainer
