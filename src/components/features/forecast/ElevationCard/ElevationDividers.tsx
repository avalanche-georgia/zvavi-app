import { sortedElevationZones } from '@domain/constants'

import { besideSlopeClipPath, sliceGap } from './mountain'

const lastIndex = sortedElevationZones.length - 1

// Hairlines under each row, reaching toward the mountain and stopping along
// its slope. Between rows they sit in the middle of the gap; the last one
// lines up with the mountain's base. A layer over the whole grid, sharing its
// rows (subgrid).
const ElevationDividers = () => (
  <div
    aria-hidden
    className="pointer-events-none col-span-2 col-start-1 row-span-3 row-start-1 grid grid-rows-subgrid"
    style={{ clipPath: besideSlopeClipPath }}
  >
    {sortedElevationZones.map((zone, index) => (
      <div key={zone} className="relative">
        <i
          className="bg-rule absolute inset-x-0 h-px"
          style={{ bottom: index === lastIndex ? 0 : -(sliceGap + 1) / 2 }}
        />
      </div>
    ))}
  </div>
)

export default ElevationDividers
