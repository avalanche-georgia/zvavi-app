import { backgroundColorByHazardLevel } from '@components/constants'
import type { ElevationZone, HazardLevelScale } from '@domain/types'

import { cn } from '@/lib/utils'

type PyramidZoneProps = {
  // Sets the height
  className?: string
  level: HazardLevelScale
  zone: ElevationZone
}

// Left slope · body · right edge of each slice. Percentages, so a slice keeps
// its shape at any height.
const shapes: Record<ElevationZone, { leftClip: string; leftWidth: string; rightClip: string }> = {
  alpine: {
    leftClip: 'polygon(40% 0px, 100% 0 , 100% 100%, 0px 100%)',
    leftWidth: 'w-15.75',
    rightClip: 'polygon(1px 0%, 100% 0, 100% 100%, 0px 100%)',
  },
  highAlpine: {
    leftClip: 'polygon(100% -3px, 100% 100%, 0 100%)',
    leftWidth: 'w-9',
    rightClip: 'polygon(1px 0%, 100% 44%, 100% 100%, 0px 100%)',
  },
  subAlpine: {
    leftClip: 'polygon(29% 0px, 100% 0px, 100% 100%, 0px 100%)',
    leftWidth: 'w-22.75',
    rightClip: 'polygon(1px 0%, 100% 0, 100% 100%, 0px 100%)',
  },
}

// One slice of the hazard pyramid (admin preview), coloured by its level, with the level number
const PyramidZone = ({ className, level, zone }: PyramidZoneProps) => {
  const { leftClip, leftWidth, rightClip } = shapes[zone]
  const color = backgroundColorByHazardLevel[level]

  return (
    <span aria-hidden className={cn('flex', className)}>
      <span className={cn(leftWidth, color)} style={{ clipPath: leftClip }} />
      <span className={cn('-mx-px flex w-24.25 items-end justify-center pb-4', color)}>
        <span className="text-ink text-copy rounded-badge bg-surface min-w-7 px-2 py-0.5 text-center font-bold">
          {level === '0' ? '–' : level}
        </span>
      </span>
      <span className={cn('w-4', color)} style={{ clipPath: rightClip }} />
    </span>
  )
}

export default PyramidZone
