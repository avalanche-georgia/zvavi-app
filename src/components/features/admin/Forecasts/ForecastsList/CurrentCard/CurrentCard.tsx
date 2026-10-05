import { LoadError } from '@components/shared'
import type { Forecast, ForecastListItem, RegionId } from '@domain/types'

import { cardShellClasses } from './cardShell'
import CurrentForecastCard from './CurrentForecastCard'
import NoCurrentForecastCard from './NoCurrentForecastCard'

type CurrentCardProps = {
  // From useGetCurrentForecast — the same query the public site uses
  currentForecast: Forecast | null | undefined
  forecasts: ForecastListItem[]
  isError: boolean
  isPending: boolean
  now: Date
  onRetry: VoidFunction
  regionId: RegionId
}

const CurrentCard = ({
  currentForecast,
  forecasts,
  isError,
  isPending,
  now,
  onRetry,
  regionId,
}: CurrentCardProps) => {
  if (isPending) return null

  // A failed load must not read as "no current forecast"
  if (isError) {
    return (
      <section className={cardShellClasses}>
        <LoadError onRetry={onRetry} />
      </section>
    )
  }

  if (currentForecast) {
    return <CurrentForecastCard forecast={currentForecast} now={now} regionId={regionId} />
  }

  // The list is newest first
  const latestDraft = forecasts.find(({ status }) => status !== 'published')

  return <NoCurrentForecastCard latestDraft={latestDraft} regionId={regionId} />
}

export default CurrentCard
