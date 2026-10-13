import Tile from './Tile'

import { cn } from '@/lib/utils'

type StepsTileProps = {
  // Position of the value on the scale, from 0
  activeIndex: number
  // Names of the first and the last step, under the bar
  endLabels: [string, string]
  label: string
  onInfoOpen: VoidFunction
  stepCount: number
  value: string
}

// A stepped bar filled up to and including the current step
const StepsTile = ({
  activeIndex,
  endLabels,
  label,
  onInfoOpen,
  stepCount,
  value,
}: StepsTileProps) => (
  <Tile label={label} onInfoOpen={onInfoOpen} value={value}>
    <div aria-hidden className="flex gap-0.75">
      {Array.from({ length: stepCount }, (_, index) => (
        <i
          key={index}
          className={cn(
            'h-2.5 flex-1 rounded-[3px]',
            index <= activeIndex ? 'bg-accent' : 'bg-off',
          )}
        />
      ))}
    </div>
    <div
      aria-hidden
      className="text-muted text-micro mt-1.5 flex justify-between gap-2 tracking-normal"
    >
      <span>{endLabels[0]}</span>
      <span className="text-right">{endLabels[1]}</span>
    </div>
  </Tile>
)

export default StepsTile
