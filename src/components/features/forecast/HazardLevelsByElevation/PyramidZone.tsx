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
  // md: the original picture (admin preview); sm: three quarters of its width,
  // for the public page where it sits next to text
  size?: PyramidZoneSize
  zone: ElevationZone
}

type PyramidZoneSize = 'md' | 'sm'

// Left slope · right edge of each slice. Percentages, so a slice keeps its
// shape at any height.
const clips: Record<ElevationZone, { left: string; right: string }> = {
  alpine: {
    left: 'polygon(40% 0px, 100% 0 , 100% 100%, 0px 100%)',
    right: 'polygon(1px 0%, 100% 0, 100% 100%, 0px 100%)',
  },
  highAlpine: {
    left: 'polygon(100% -3px, 100% 100%, 0 100%)',
    right: 'polygon(1px 0%, 100% 44%, 100% 100%, 0px 100%)',
  },
  subAlpine: {
    left: 'polygon(29% 0px, 100% 0px, 100% 100%, 0px 100%)',
    right: 'polygon(1px 0%, 100% 0, 100% 100%, 0px 100%)',
  },
}

// Widths of the left slope per band, the body and the right edge
const widths: Record<
  PyramidZoneSize,
  { body: string; left: Record<ElevationZone, string>; right: string }
> = {
  md: {
    body: 'w-[97px]',
    left: { alpine: 'w-[63px]', highAlpine: 'w-9', subAlpine: 'w-[91px]' },
    right: 'w-4',
  },
  sm: {
    body: 'w-[73px]',
    left: { alpine: 'w-[47px]', highAlpine: 'w-[27px]', subAlpine: 'w-[68px]' },
    right: 'w-3',
  },
}

// One slice of the hazard pyramid, coloured by its level, with the level number
const PyramidZone = (props: PyramidZoneProps) => {
  const { className, label, level, onClick, size = 'md', zone } = props
  const { body, left, right } = widths[size]
  const color = backgroundColorByHazardLevel[level]

  const slice = (
    <>
      <span className={cn(left[zone], color)} style={{ clipPath: clips[zone].left }} />
      <span className={cn('-mx-px flex items-end justify-center pb-4', body, color)}>
        <span className="text-ink text-copy min-w-7 rounded-sm bg-white px-2 py-0.5 text-center font-bold">
          {level === '0' ? '–' : level}
        </span>
      </span>
      <span className={cn(right, color)} style={{ clipPath: clips[zone].right }} />
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
