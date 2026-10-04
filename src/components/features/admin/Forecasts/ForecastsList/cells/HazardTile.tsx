import { backgroundColorByHazardLevel } from '@components/constants'
import { isDarkHazard } from '@components/features/forecasts/HazardLevels/constants'
import type { HazardLevelScale } from '@domain/types'

import { cn } from '@/lib/utils'

export type HazardTileSize = 'lg' | 'md' | 'sm'

const sizeClasses: Record<HazardTileSize, string> = {
  // current-forecast card
  lg: 'size-14 rounded-media text-title',
  // table row
  md: 'size-7.5 rounded-lg text-copy',
  // card elevation zones
  sm: 'h-7 w-full rounded-md text-copy-sm',
}

type HazardTileProps = {
  className?: string
  level: HazardLevelScale
  size: HazardTileSize
  title?: string
}

// Coloured square with the level number; 0 (no rating) shows a dash
const HazardTile = ({ className, level, size, title }: HazardTileProps) => (
  <span
    className={cn(
      'grid shrink-0 place-items-center font-bold tabular-nums',
      backgroundColorByHazardLevel[level],
      isDarkHazard(level) ? 'text-white' : 'text-ink',
      sizeClasses[size],
      className,
    )}
    title={title}
  >
    {level === '0' ? '–' : level}
  </span>
)

export default HazardTile
