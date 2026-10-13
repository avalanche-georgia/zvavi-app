import { compassGrid } from '@domain/aspects'
import { sortedElevationZones } from '@domain/constants'
import type { Aspects } from '@domain/types'

import { cn } from '@/lib/utils'

// Three tiny 3×3 compasses — High Alpine, Alpine, Sub Alpine — for list rows.
// Decorative: the aspect summary next to it says the same in words.
const ZoneAspectDots = ({ aspects }: { aspects: Aspects }) => (
  <span aria-hidden className="flex shrink-0 gap-1">
    {sortedElevationZones.map((zone) => (
      <span key={zone} className="grid grid-cols-[repeat(3,5px)] gap-[1.5px]">
        {compassGrid.map((aspect, index) => (
          <i
            key={index}
            className={cn(
              'size-1.25 rounded-[1.5px]',
              aspect !== null && (aspects[zone]?.includes(aspect) ? 'bg-accent' : 'bg-off'),
            )}
          />
        ))}
      </span>
    ))}
  </span>
)

export default ZoneAspectDots
