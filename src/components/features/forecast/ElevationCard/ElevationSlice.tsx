import { backgroundColorByHazardLevel } from '@components/constants'
import type { ElevationZone, HazardLevelScale } from '@domain/types'

import { getSliceClipPath, sliceHeights, slopeWidth } from './slope'

import { cn } from '@/lib/utils'

type ElevationSliceProps = {
  // Accessible name, e.g. "High Alpine danger level — 4"
  label: string
  level: HazardLevelScale
  onClick: VoidFunction
  zone: ElevationZone
}

// One slice of the mountain, coloured by its level, with the level number.
// Opens the explanation of that level.
const ElevationSlice = ({ label, level, onClick, zone }: ElevationSliceProps) => (
  <button
    aria-haspopup="dialog"
    aria-label={label}
    className="focus-ring shrink-0 cursor-pointer rounded-sm"
    onClick={onClick}
    style={{ height: sliceHeights[zone], width: slopeWidth }}
    type="button"
  >
    <span
      className={cn(
        'flex size-full items-end justify-end pr-2 pb-2',
        backgroundColorByHazardLevel[level],
      )}
      style={{ clipPath: getSliceClipPath(zone) }}
    >
      <span className="text-ink text-copy min-w-7 rounded-sm bg-white px-2 py-0.5 text-center font-bold">
        {level === '0' ? '–' : level}
      </span>
    </span>
  </button>
)

export default ElevationSlice
