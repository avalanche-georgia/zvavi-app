import type { Forecast } from '@domain/types'

import DangerBand from './DangerBand'
import DangerFacts from './DangerFacts'
import DangerScale from './DangerScale'
import ReadForecastLink from './ReadForecastLink'

import { cn } from '@/lib/utils'

type DangerCardProps = {
  className?: string
  forecast: Forecast
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
      <DangerFacts forecast={forecast} isCurrentForecast={isCurrentForecast} />
      {forecastHref && <ReadForecastLink href={forecastHref} />}
    </section>
  )
}

export default DangerCard
