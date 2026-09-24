import { aspects as aspectLabels } from '@domain/constants'
import type { Aspect } from '@domain/types'

import { compassGrid } from './compassGrid'

import { cn } from '@/lib/utils'

type BandCompassProps = {
  aspects: Aspect[]
  label: string
}

// One elevation band: label + labeled 3×3 compass with the selected aspects
const BandCompass = ({ aspects, label }: BandCompassProps) => (
  <div className="bg-tile flex flex-col items-center gap-2 rounded-xl px-1.5 pt-2.5 pb-2">
    <span className="text-body text-xs font-semibold">{label}</span>
    <div className="grid grid-cols-[repeat(3,20px)] gap-0.75">
      {compassGrid.map((aspect, index) =>
        aspect === null ? (
          <i key={index} />
        ) : (
          <i
            key={aspect}
            className={cn(
              'grid h-5 place-items-center rounded-[5px] text-[8.5px] font-semibold not-italic',
              aspects.includes(aspect) ? 'bg-accent text-white' : 'bg-white text-[#9a9ca3]',
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
