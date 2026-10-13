import type { Forecast } from '@domain/types'

import DangerBand, { type DangerBandAction } from './DangerBand'
import DangerFacts from './DangerFacts'
import DangerScale from './DangerScale'

import { cn } from '@/lib/utils'

type DangerCardProps = {
  // What a click on the band does
  action: DangerBandAction
  className?: string
  forecast: Forecast
  isCurrentForecast: boolean
}

// The hero: overall danger level, the 1–5 scale, and when the forecast was
// issued, until when it holds and who wrote it
const DangerCard = ({ action, className, forecast, isCurrentForecast }: DangerCardProps) => {
  const level = forecast.hazardLevels.overall

  return (
    <section
      className={cn('rounded-card border-rule bg-surface overflow-hidden border', className)}
    >
      <DangerBand action={action} level={level} />
      {level !== '0' && <DangerScale level={level} />}
      <DangerFacts forecast={forecast} isCurrentForecast={isCurrentForecast} />
    </section>
  )
}

export default DangerCard
