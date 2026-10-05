import { backgroundColorByHazardLevel } from '@components/constants'
import type { HazardLevels } from '@domain/types'

import { cn } from '@/lib/utils'

const bars = [
  { width: 'w-2', zone: 'highAlpine' },
  { width: 'w-3.75', zone: 'alpine' },
  { width: 'w-5.5', zone: 'subAlpine' },
] as const

// Mini elevation pyramid: high alpine on top, sub alpine at the base
const HazardBars = ({ hazardLevels }: { hazardLevels: HazardLevels }) => (
  <span aria-hidden className="flex flex-col items-center gap-0.5">
    {bars.map(({ width, zone }) => (
      <span
        key={zone}
        className={cn('h-1.5 rounded-xs', width, backgroundColorByHazardLevel[hazardLevels[zone]])}
      />
    ))}
  </span>
)

export default HazardBars
