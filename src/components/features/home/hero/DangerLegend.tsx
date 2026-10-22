import { backgroundColorByHazardLevel } from '@components/constants'
import { hazardScaleLevels } from '@components/features/forecast/model/hazard'
import { hazardLevelNamesByScale } from '@domain/constants'
import { useTranslations } from 'next-intl'

import { cn } from '@/lib/utils'

// 1 Low · 2 Moderate · … · 5 Extreme — keys the colours of the list and the map
const DangerLegend = () => {
  const t = useTranslations()

  return (
    <ul
      aria-label={t('home.hero.legendLabel')}
      className="text-muted text-caption mt-3.5 flex flex-wrap justify-center gap-x-2.5 gap-y-1"
    >
      {hazardScaleLevels.map((level) => (
        <li key={level} className="flex items-center gap-1.25">
          <i
            aria-hidden
            className={cn(
              'rounded-bar size-2.5 shadow-[inset_0_0_0_1px_rgba(0,0,0,.1)]',
              backgroundColorByHazardLevel[level],
            )}
          />
          {level} {t(hazardLevelNamesByScale[level])}
        </li>
      ))}
    </ul>
  )
}

export default DangerLegend
