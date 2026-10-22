import { backgroundColorByHazardLevel, hazardIcons } from '@components/constants'
import { hazardLevelNamesByScale } from '@domain/constants'
import type { HazardLevelScale } from '@domain/types'
import { Info } from 'lucide-react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

import { hazardTextClass } from '../model/hazard'

import { cn } from '@/lib/utils'

type DangerBandProps = {
  level: HazardLevelScale
  // Opens the explanation of this level
  onInfoOpen: VoidFunction
}

// The coloured top of the danger card: official icon, "Overall danger", the
// level name and "What this means". A click explains the level.
const DangerBand = ({ level, onInfoOpen }: DangerBandProps) => {
  const t = useTranslations()

  return (
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
        className="rounded-media size-16 shrink-0"
        height={64}
        src={hazardIcons[level]}
        width={64}
      />
      <span className="min-w-0 flex-1">
        <span className="tracking-eyebrow text-caption block font-semibold uppercase">
          {t('common.labels.overallDangerLevel')}
        </span>
        <span className="text-title mt-0.5 block font-bold wrap-break-word hyphens-auto">
          {t(hazardLevelNamesByScale[level])}
        </span>
        <span className="text-caption mt-1.5 inline-flex items-center gap-1 font-semibold underline decoration-1 underline-offset-3 group-hover:decoration-2">
          {t('forecast.page.whatThisMeans')}
          <Info aria-hidden className="size-3.5" />
        </span>
      </span>
    </button>
  )
}

export default DangerBand
