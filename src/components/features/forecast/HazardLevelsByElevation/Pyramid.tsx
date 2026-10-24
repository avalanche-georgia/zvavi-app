import { sortedElevationZones } from '@domain/constants'
import type { ElevationZone, HazardLevels as HazardLevelsType } from '@domain/types'

import PyramidZone from './PyramidZone'

const heights: Record<ElevationZone, string> = {
  alpine: 'h-14.75',
  highAlpine: 'h-20',
  subAlpine: 'h-15',
}

// The hazard pyramid as a fixed-size picture (admin preview). Positions itself
// against the bottom-right of its relative parent.
const Pyramid = ({ hazardLevels }: { hazardLevels: HazardLevelsType }) => (
  <div className="absolute right-0 bottom-0 flex flex-col items-end gap-1.25 pb-4.5">
    {sortedElevationZones.map((zone) => (
      <PyramidZone key={zone} className={heights[zone]} level={hazardLevels[zone]} zone={zone} />
    ))}
  </div>
)

export default Pyramid
