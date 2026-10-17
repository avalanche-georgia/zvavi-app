import type { Forecast, TeamMember } from '@domain/types'

import DangerBand from './DangerBand'
import DangerFacts from './DangerFacts'
import DangerScale from './DangerScale'
import ReadForecastLink from './ReadForecastLink'

import { cn } from '@/lib/utils'

type DangerCardProps = {
  className?: string
  forecast: Forecast
  // Their public Team profile — the name opens it
  forecasterProfile: TeamMember | null
  // Adds a "Read full forecast" row leading here (outside the forecast page)
  forecastHref?: string
  isCurrentForecast: boolean
  // The band explains the level
  onInfoOpen: VoidFunction
}

// The hero: overall danger level, the 1–5 scale, and when the forecast was
// issued, until when it holds and who wrote it; optionally a link to the forecast
const DangerCard = ({
  className,
  forecast,
  forecastHref,
  forecasterProfile,
  isCurrentForecast,
  onInfoOpen,
}: DangerCardProps) => {
  const level = forecast.hazardLevels.overall

  return (
    <section
      className={cn('rounded-card border-rule bg-surface overflow-hidden border', className)}
    >
      <DangerBand level={level} onInfoOpen={onInfoOpen} />
      {level !== '0' && <DangerScale level={level} />}
      <DangerFacts
        forecast={forecast}
        forecasterProfile={forecasterProfile}
        isCurrentForecast={isCurrentForecast}
      />
      {forecastHref && <ReadForecastLink href={forecastHref} />}
    </section>
  )
}

export default DangerCard
