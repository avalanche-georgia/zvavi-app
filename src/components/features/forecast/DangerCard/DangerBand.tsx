import { backgroundColorByHazardLevel, hazardIcons } from '@components/constants'
import { hazardLevelNamesByScale } from '@domain/constants'
import type { HazardLevelScale } from '@domain/types'
import { ChevronRight, Info } from 'lucide-react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Link } from 'src/i18n/navigation'

import { hazardTextClass } from '../model/hazard'

import { cn } from '@/lib/utils'

// What the band does: opens the level's explanation, or leads to the forecast
export type DangerBandAction = { forecastHref: string } | { onInfoOpen: VoidFunction }

type DangerBandProps = {
  action: DangerBandAction
  level: HazardLevelScale
}

const hintIconClasses = 'size-3.5'

// The coloured top of the danger card: official icon, "Overall danger", the
// level name and a hint of what a click does
const DangerBand = ({ action, level }: DangerBandProps) => {
  const t = useTranslations()
  const isLink = 'forecastHref' in action

  const className = cn(
    'group flex w-full items-center gap-3.5 p-4 text-left',
    'focus-visible:outline-accent focus-visible:outline-2 focus-visible:-outline-offset-2',
    backgroundColorByHazardLevel[level],
    hazardTextClass(level),
  )

  const content = (
    <>
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
        <span className="text-title mt-0.5 block font-bold wrap-break-word hyphens-auto">
          {t(hazardLevelNamesByScale[level])}
        </span>
        <span className="text-caption mt-1.5 inline-flex items-center gap-1 font-semibold underline decoration-1 underline-offset-3 group-hover:decoration-2">
          {isLink ? t('common.actions.readFullForecast') : t('forecast.page.whatThisMeans')}
          {isLink ? (
            <ChevronRight aria-hidden className={hintIconClasses} />
          ) : (
            <Info aria-hidden className={hintIconClasses} />
          )}
        </span>
      </span>
    </>
  )

  if (isLink) {
    return (
      <Link className={className} href={action.forecastHref}>
        {content}
      </Link>
    )
  }

  return (
    <button className={className} onClick={action.onInfoOpen} type="button">
      {content}
    </button>
  )
}

export default DangerBand
