import { compassGrid } from '@domain/aspects'
import { aspects as aspectLabels } from '@domain/constants'
import type { Aspect } from '@domain/types'

import { cn } from '@/lib/utils'

type BandCompassSurface = 'tile' | 'white'

type BandCompassProps = {
  aspects: Aspect[]
  // Faded — for a band shown although nothing is selected in it
  isDimmed?: boolean
  label: string
  // What it sits on: a white surface (grey box, white cells) or a grey tile (the inverse)
  surface?: BandCompassSurface
}

const boxClasses: Record<BandCompassSurface, string> = {
  tile: 'bg-white',
  white: 'bg-tile',
}

const emptyCellClasses: Record<BandCompassSurface, string> = {
  tile: 'bg-tile text-placeholder',
  white: 'bg-white text-placeholder',
}

// One elevation band: label + labeled 3×3 compass with the selected aspects
const BandCompass = ({ aspects, isDimmed = false, label, surface = 'white' }: BandCompassProps) => (
  <div
    className={cn(
      'flex min-w-0 flex-col items-center gap-2 rounded-xl px-1.5 pt-2.5 pb-2',
      boxClasses[surface],
      isDimmed && 'opacity-50',
    )}
  >
    <span className="text-body text-center text-xs leading-tight font-semibold">{label}</span>
    <div className="mt-auto grid grid-cols-[repeat(3,20px)] gap-0.75">
      {compassGrid.map((aspect, index) =>
        aspect === null ? (
          <i key={index} />
        ) : (
          <i
            key={aspect}
            className={cn(
              'grid h-5 place-items-center rounded-[5px] text-[8.5px] font-semibold not-italic',
              aspects.includes(aspect) ? 'bg-accent text-white' : emptyCellClasses[surface],
            )}
          >
            {aspectLabels[aspect]}
          </i>
        ),
      )}
    </div>
  </div>
)

export default BandCompass
