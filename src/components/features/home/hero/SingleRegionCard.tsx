import { DangerCard } from '@components/features/forecast'
import { ExpiredNote } from '@components/features/regionHome'
import type { Forecast, RegionId } from '@domain/types'

import NoDangerCard from './NoDangerCard'
import type { RegionForecastState } from '../types'

import { routes } from '@/routes'

type SingleRegionCardProps = {
  forecast: Forecast | null
  regionId: RegionId
  state: RegionForecastState
}

// The only region's danger, as on its own page — or why there is none
const SingleRegionCard = ({ forecast, regionId, state }: SingleRegionCardProps) => {
  if (!forecast || state === 'offSeason' || state === 'none') {
    return <NoDangerCard isOffSeason={state === 'offSeason'} regionId={regionId} />
  }

  return (
    <div className="flex flex-col gap-3">
      {state !== 'noRating' && <ExpiredNote validUntil={forecast.validUntil} />}
      <DangerCard
        action={{ forecastHref: routes.forecastsByRegion(regionId).current }}
        forecast={forecast}
        isCurrentForecast
      />
    </div>
  )
}

export default SingleRegionCard
