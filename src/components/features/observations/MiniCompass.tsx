import { compassGrid } from '@domain/aspects'
import type { Aspect } from '@domain/types'

import { cn } from '@/lib/utils'

// Glanceable 3×3 compass for cards — which aspects, no labels
const MiniCompass = ({ aspects }: { aspects: Aspect[] }) => (
  <span aria-hidden="true" className="grid grid-cols-[repeat(3,5px)] gap-[1.5px]">
    {compassGrid.map((aspect, index) => (
      <i
        key={index}
        className={cn(
          // 5px dots: no radius token is small enough (a token radius turns them into circles)
          'size-1.25 rounded-[1.5px]',
          aspect === null ? 'bg-transparent' : aspects.includes(aspect) ? 'bg-accent' : 'bg-off',
        )}
      />
    ))}
  </span>
)

export default MiniCompass
