import { backgroundColorByHazardLevel } from '@components/constants'
import { hazardLevelNamesByScale } from '@domain/constants'
import type { HazardLevelScale } from '@domain/types'
import { useTranslations } from 'next-intl'

import { hazardScaleLevels } from '../model/hazard'

import { cn } from '@/lib/utils'

// Five-segment strip with the current level raised; "1 Low" … "5 Extreme" below
const DangerScale = ({ level }: { level: HazardLevelScale }) => {
  const t = useTranslations()
  const [lowest] = hazardScaleLevels
  const highest = hazardScaleLevels[hazardScaleLevels.length - 1]

  return (
    <>
      <div aria-hidden className="grid grid-cols-5 items-start gap-0.75 px-4 pt-3">
        {hazardScaleLevels.map((scaleLevel) => (
          <i
            key={scaleLevel}
            className={cn(
              'rounded-bar',
              backgroundColorByHazardLevel[scaleLevel],
              scaleLevel === level
                ? '-mt-0.5 h-2.5 shadow-[inset_0_0_0_1px_rgba(0,0,0,.15)]'
                : 'h-1.5 opacity-30',
            )}
          />
        ))}
      </div>
      <div aria-hidden className="text-muted text-caption flex justify-between px-4 pt-1.5">
        <span>
          {lowest} {t(hazardLevelNamesByScale[lowest])}
        </span>
        <span>
          {highest} {t(hazardLevelNamesByScale[highest])}
        </span>
      </div>
    </>
  )
}

export default DangerScale
