'use client'

import { Spinner } from '@components/ui'
import { useGetCurrentForecast } from '@data/hooks/forecasts'
import { regionIds } from '@domain/constants'

import CurrentForecast from './CurrentForecast'

const CurrentForecastContainer = () => {
  // TODO(PR 4): replace with regionId from RegionContext
  const regionIdMock = regionIds.gudauri
  const { data: forecast, isPending } = useGetCurrentForecast({
    isShort: true,
    regionId: regionIdMock,
  })

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
