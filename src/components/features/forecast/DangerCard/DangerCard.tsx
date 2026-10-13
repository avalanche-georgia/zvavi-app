import { backgroundColorByHazardLevel, hazardIcons } from '@components/constants'
import { hazardLevelNamesByScale } from '@domain/constants'
import type { Forecast } from '@domain/types'
import { Info } from 'lucide-react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

import DangerFacts from './DangerFacts'
import DangerScale from './DangerScale'
import { hazardTextClass } from '../model/hazard'

import { cn } from '@/lib/utils'

type DangerCardProps = {
  className?: string
  forecast: Forecast
  isCurrentForecast: boolean
  onInfoOpen: VoidFunction
}

// The hero: overall danger level (opens its explanation), the 1–5 scale, and
// when the forecast was issued, until when it holds and who wrote it
const DangerCard = ({ className, forecast, isCurrentForecast, onInfoOpen }: DangerCardProps) => {
  const t = useTranslations()
  const level = forecast.hazardLevels.overall

  return (
    <section
      className={cn('rounded-card border-rule bg-surface overflow-hidden border', className)}
    >
      <button
        className={cn(
          'group flex w-full items-center gap-3.5 p-4 text-left',
          'focus-visible:outline-accent focus-visible:outline-2 focus-visible:-outline-offset-2',
          backgroundColorByHazardLevel[level],
          hazardTextClass(level),
        )}
        onClick={onInfoOpen}
        type="button"
      >
        <Image
          alt=""
          className="size-16 shrink-0 rounded-xl"
          height={64}
          src={hazardIcons[level]}
          width={64}
        />
        <span className="min-w-0 flex-1">
          <span className="block text-xs font-semibold tracking-[.06em] uppercase">
            {t('common.labels.overallDangerLevel')}
          </span>
          <span className="text-title-lg mt-0.5 block font-bold wrap-anywhere">
            {t(hazardLevelNamesByScale[level])}
          </span>
          <span className="text-caption mt-1.5 inline-flex items-center gap-1 font-semibold underline decoration-1 underline-offset-3 group-hover:decoration-2">
            {t('forecast.page.whatThisMeans')}
            <Info aria-hidden className="size-3.5" />
          </span>
        </span>
      </button>
      {level !== '0' && <DangerScale level={level} />}
      <DangerFacts forecast={forecast} isCurrentForecast={isCurrentForecast} />
    </section>
  )
}

export default DangerCard
