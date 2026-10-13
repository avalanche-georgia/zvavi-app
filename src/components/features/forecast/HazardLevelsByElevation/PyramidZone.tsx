import { backgroundColorByHazardLevel } from '@components/constants'
import type { ElevationZone, HazardLevelScale } from '@domain/types'

import { cn } from '@/lib/utils'

type PyramidZoneProps = {
  // Sets the height (the pyramid's fixed slice, or a row's stretch)
  className?: string
  // Accessible name when the slice is a button, e.g. "High Alpine danger level — 4"
  label?: string
  level: HazardLevelScale
  // Present: the slice is a button
  onClick?: VoidFunction
  zone: ElevationZone
}

// Left slope · body · right edge of each slice. Percentages, so a slice keeps
// its shape at any height.
const shapes: Record<ElevationZone, { leftClip: string; leftWidth: string; rightClip: string }> = {
  alpine: {
    leftClip: 'polygon(40% 0px, 100% 0 , 100% 100%, 0px 100%)',
    leftWidth: 'w-[63px]',
    rightClip: 'polygon(1px 0%, 100% 0, 100% 100%, 0px 100%)',
  },
  highAlpine: {
    leftClip: 'polygon(100% -3px, 100% 100%, 0 100%)',
    leftWidth: 'w-9',
    rightClip: 'polygon(1px 0%, 100% 44%, 100% 100%, 0px 100%)',
  },
  subAlpine: {
    leftClip: 'polygon(29% 0px, 100% 0px, 100% 100%, 0px 100%)',
    leftWidth: 'w-[91px]',
    rightClip: 'polygon(1px 0%, 100% 0, 100% 100%, 0px 100%)',
  },
}

// One slice of the hazard pyramid, coloured by its level, with the level number
const PyramidZone = ({ className, label, level, onClick, zone }: PyramidZoneProps) => {
  const { leftClip, leftWidth, rightClip } = shapes[zone]
  const color = backgroundColorByHazardLevel[level]

  const slice = (
    <>
      <span className={cn(leftWidth, color)} style={{ clipPath: leftClip }} />
      <span className={cn('-mx-px flex w-[97px] items-end justify-center pb-4', color)}>
        <span className="text-ink text-copy min-w-7 rounded-sm bg-white px-2 py-0.5 text-center font-bold">
          {level === '0' ? '–' : level}
        </span>
      </span>
      <span className={cn('w-4', color)} style={{ clipPath: rightClip }} />
    </>
  )

  if (!onClick) {
    return (
      <span aria-hidden className={cn('flex', className)}>
        {slice}
      </span>
    )
  }

  return (
    <button
      aria-haspopup="dialog"
      aria-label={label}
      className={cn('focus-ring flex cursor-pointer rounded-sm', className)}
      onClick={onClick}
      type="button"
    >
      {slice}
    </button>
  )
}

export default PyramidZone
