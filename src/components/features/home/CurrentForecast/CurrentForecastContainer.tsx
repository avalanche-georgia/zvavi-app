'use client'

import { Spinner } from '@components/ui'
import { useGetCurrentForecast } from '@data/hooks/forecasts'
import { useRegionContext } from '@domain/context/RegionContext'

import CurrentForecast from './CurrentForecast'
import NoForecastPlaceholder from './NoForecastPlaceholder'

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

  if (!forecast) return <NoForecastPlaceholder />

  return <CurrentForecast forecast={forecast} />
}

export default CurrentForecastContainer
