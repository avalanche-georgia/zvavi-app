import type { ElevationKey, Forecast } from '@domain/types'

import { DangerCard } from './DangerCard'
import { ElevationCard } from './ElevationCard'
import ForecastAreaLink from './sections/ForecastAreaLink'
import SponsorsCard from './sections/SponsorsCard'

type ForecastRailProps = {
  forecast: Forecast
  isCurrentForecast: boolean
  onDangerInfoOpen: (scope: ElevationKey) => void
}

// Danger card → By elevation → Forecast area → Sponsors. A sticky left column
// on desktop; on mobile `contents` + `order-*` spread its cards around the
// main column's (area and sponsors go last).
const ForecastRail = ({ forecast, isCurrentForecast, onDangerInfoOpen }: ForecastRailProps) => (
  <div className="contents lg:sticky lg:top-[calc(var(--forecast-header-height)+16px)] lg:flex lg:flex-col lg:gap-3">
    <DangerCard
      className="order-1 lg:order-0"
      forecast={forecast}
      isCurrentForecast={isCurrentForecast}
      onInfoOpen={() => onDangerInfoOpen('overall')}
    />
    <ElevationCard
      className="order-2 lg:order-0"
      hazardLevels={forecast.hazardLevels}
      onZoneInfoOpen={onDangerInfoOpen}
      regionId={forecast.regionId}
    />
    <ForecastAreaLink className="order-8 lg:order-0" regionId={forecast.regionId} />
    <SponsorsCard className="order-9 lg:order-0" />
  </div>
)

export default ForecastRail
