import type { Forecast } from '@domain/types'
import { useTranslations } from 'next-intl'

import HazardsList from './HazardsList'
import Prose from './Prose'
import { sectionAnchorClasses, sectionLabelClasses } from './SectionCard'

import { cn } from '@/lib/utils'

type ConditionsCardProps = {
  className?: string
  forecast: Pick<Forecast, 'additionalHazards' | 'snowpack' | 'weather'>
}

const headingClasses = cn(sectionLabelClasses, 'mb-2')

// Snowpack | Weather side by side on desktop, additional hazards below.
// The 1px gaps over a rule-coloured background draw the dividers.
const ConditionsCard = ({ className, forecast }: ConditionsCardProps) => {
  const t = useTranslations()
  const { additionalHazards, snowpack, weather } = forecast
  const hasBothColumns = Boolean(snowpack && weather)

  return (
    <section
      className={cn(
        'rounded-card border-rule bg-rule grid min-w-0 gap-px overflow-hidden border outline-hidden',
        hasBothColumns && 'lg:grid-cols-2',
        sectionAnchorClasses,
        className,
      )}
      id="conditions"
      tabIndex={-1}
    >
      {snowpack && (
        <div className="bg-surface min-w-0 p-4 lg:p-5">
          <h2 className={headingClasses}>{t('forecast.sections.snowpack.title')}</h2>
          <Prose className="text-copy-lg leading-[1.6]" content={snowpack} />
        </div>
      )}
      {weather && (
        <div className="bg-surface min-w-0 p-4 lg:p-5">
          <h2 className={headingClasses}>{t('forecast.sections.weather.title')}</h2>
          <Prose className="text-copy-lg leading-[1.6]" content={weather} />
        </div>
      )}
      {additionalHazards && (
        <div className="bg-surface col-span-full min-w-0 p-4 lg:p-5">
          <h2 className={headingClasses}>{t('forecast.sections.additionalHazards.title')}</h2>
          <HazardsList text={additionalHazards} />
        </div>
      )}
    </section>
  )
}

export default ConditionsCard
