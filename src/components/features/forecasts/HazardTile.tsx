import { backgroundColorByHazardLevel } from '@components/constants'
import { hazardTextClass } from '@components/features/forecast/model/hazard'
import type { HazardLevelScale } from '@domain/types'

import { isDarkHazard } from './HazardLevels/constants'

import { cn } from '@/lib/utils'

export type HazardTilePalette = 'admin' | 'public'
export type HazardTileSize = 'lg' | 'md' | 'sm'

const sizeClasses: Record<HazardTileSize, string> = {
  // current-forecast card
  lg: 'size-14 rounded-media text-title',
  // table row
  md: 'rounded-item text-copy size-7.5',
  // card elevation zones
  sm: 'rounded-badge text-copy-sm h-7 w-full',
}

type HazardTileProps = {
  className?: string
  // Screen-reader text for the level (the number alone means little)
  label?: string
  level: HazardLevelScale
  // public: only level 5 gets white text (forecasters' request); admin: 4 and 5
  palette?: HazardTilePalette
  size: HazardTileSize
  title?: string
}

const getTextClass = (level: HazardLevelScale, palette: HazardTilePalette) => {
  if (palette === 'public') return hazardTextClass(level)

  return isDarkHazard(level) ? 'text-white' : 'text-ink'
}

// Coloured square with the level number; 0 (no rating) shows a dash
const HazardTile = ({
  className,
  label,
  level,
  palette = 'admin',
  size,
  title,
}: HazardTileProps) => (
  <span
    className={cn(
      'grid shrink-0 place-items-center font-bold tabular-nums',
      backgroundColorByHazardLevel[level],
      getTextClass(level, palette),
      sizeClasses[size],
      className,
    )}
    title={title}
  >
    <span aria-hidden={!!label}>{level === '0' ? '–' : level}</span>
    {label && <span className="sr-only">{label}</span>}
  </span>
)

export default HazardTile
