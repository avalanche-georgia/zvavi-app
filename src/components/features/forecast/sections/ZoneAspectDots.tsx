import { MiniCompass } from '@components/features/observations'
import { sortedElevationZones } from '@domain/constants'
import type { Aspects } from '@domain/types'

// Three tiny 3×3 compasses — High Alpine, Alpine, Sub Alpine — for list rows.
// Decorative: the aspect summary next to it says the same in words.
const ZoneAspectDots = ({ aspects }: { aspects: Aspects }) => (
  <span aria-hidden className="flex shrink-0 gap-1">
    {sortedElevationZones.map((zone) => (
      <MiniCompass key={zone} aspects={aspects[zone] ?? []} />
    ))}
  </span>
)

export default ZoneAspectDots
