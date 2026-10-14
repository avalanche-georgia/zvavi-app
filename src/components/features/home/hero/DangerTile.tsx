import { backgroundColorByHazardLevel } from '@components/constants'
import { hazardTextClass } from '@components/features/forecast/model/hazard'
import type { HazardLevelScale } from '@domain/types'

import { cn } from '@/lib/utils'

// Coloured square with the level number, or a grey "–" without a rating
const DangerTile = ({ level }: { level: HazardLevelScale | null }) => (
  <span
    aria-hidden
    className={cn(
      'rounded-field grid size-11 place-items-center font-bold shadow-[inset_0_0_0_1px_rgba(0,0,0,.08)]',
      level
        ? [backgroundColorByHazardLevel[level], hazardTextClass(level), 'text-xl']
        : 'bg-tile text-muted text-copy-sm',
    )}
  >
    {level ?? '–'}
  </span>
)

export default DangerTile
