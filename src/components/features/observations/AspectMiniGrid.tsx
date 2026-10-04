import { compassGrid } from '@domain/aspects'
import type { Aspects, ElevationZone } from '@domain/types'
import { useTranslations } from 'next-intl'

import { cn } from '@/lib/utils'

const zones: ElevationZone[] = ['highAlpine', 'alpine', 'subAlpine']

// Read-only overview: one tiny 3×3 compass per elevation zone. A zone with
// nothing selected is dimmed.
const AspectMiniGrid = ({ aspects }: { aspects: Aspects }) => {
  const t = useTranslations()

  return (
    <div className="flex gap-2.5">
      {zones.map((zone) => (
        <div
          key={zone}
          className={cn('flex flex-col items-center gap-1', !aspects[zone].length && 'opacity-45')}
        >
          <div aria-hidden className="grid grid-cols-[repeat(3,8px)] gap-0.5">
            {compassGrid.map((aspect, index) =>
              aspect === null ? (
                <i key={index} />
              ) : (
                <i
                  key={aspect}
                  className={cn(
                    'size-2 rounded-[2px]',
                    aspects[zone].includes(aspect) ? 'bg-accent' : 'bg-off',
                  )}
                />
              ),
            )}
          </div>
          <span className="text-muted text-[9.5px] font-semibold">
            {t(`common.elevationZonesShort.${zone}`)}
          </span>
        </div>
      ))}
    </div>
  )
}

export default AspectMiniGrid
