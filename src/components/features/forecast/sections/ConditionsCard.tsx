import type { Forecast } from '@domain/types'
import { useTranslations } from 'next-intl'

import CollapsibleCard from './CollapsibleCard'
import HazardsList from './HazardsList'
import Prose from './Prose'
import { sectionAnchorClasses } from './SectionCard'

import { cn } from '@/lib/utils'

type ConditionsCardProps = {
  className?: string
  forecast: Pick<Forecast, 'additionalHazards' | 'snowpack' | 'weather'>
}

// Snowpack, weather and additional hazards — one card each, folded until the
// reader opens them. The group is one stop of the jump bar.
const ConditionsCard = ({ className, forecast }: ConditionsCardProps) => {
  const t = useTranslations()
  const { additionalHazards, snowpack, weather } = forecast

  return (
    <div
      className={cn('flex min-w-0 flex-col gap-3 outline-hidden', sectionAnchorClasses, className)}
      id="conditions"
      // Focusable from the jump bar only
      tabIndex={-1}
    >
      {snowpack && (
        <CollapsibleCard isInitiallyOpen={false} title={t('forecast.sections.snowpack.title')}>
          <Prose className="text-copy-lg leading-[1.6]" content={snowpack} />
        </CollapsibleCard>
      )}
      {weather && (
        <CollapsibleCard isInitiallyOpen={false} title={t('forecast.sections.weather.title')}>
          <Prose className="text-copy-lg leading-[1.6]" content={weather} />
        </CollapsibleCard>
      )}
      {additionalHazards && (
        <CollapsibleCard
          isInitiallyOpen={false}
          title={t('forecast.sections.additionalHazards.title')}
        >
          <HazardsList text={additionalHazards} />
        </CollapsibleCard>
      )}
    </div>
  )
}

export default ConditionsCard
