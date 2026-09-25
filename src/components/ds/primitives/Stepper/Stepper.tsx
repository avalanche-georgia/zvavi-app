import { NumberField } from '@base-ui/react/number-field'
import { Minus, Plus } from 'lucide-react'

import { fieldControlClasses } from '../Field'

import { cn } from '@/lib/utils'

type StepperProps = {
  className?: string
  decrementLabel: string
  incrementLabel: string
  max?: number
  min?: number
  onValueChange: (value: number) => void
  value: number
}

const stepButtonClasses = [
  'focus-ring text-body flex size-11 items-center justify-center rounded-field transition-colors',
  'hover:bg-tile data-disabled:cursor-default data-disabled:opacity-30',
].join(' ')

// − value + with large touch targets. Clearing the input falls back to `min`.
const Stepper = ({
  className,
  decrementLabel,
  incrementLabel,
  max,
  min = 0,
  onValueChange,
  value,
}: StepperProps) => {
  const handleValueChange = (nextValue: number | null) => onValueChange(nextValue ?? min)

  return (
    <NumberField.Root
      className={className}
      max={max}
      min={min}
      onValueChange={handleValueChange}
      value={value}
    >
      <NumberField.Group
        className={cn(
          fieldControlClasses,
          'has-focus-visible:border-accent flex h-11.5 w-max items-center',
        )}
      >
        <NumberField.Decrement aria-label={decrementLabel} className={stepButtonClasses}>
          <Minus aria-hidden className="size-5" />
        </NumberField.Decrement>
        <NumberField.Input className="w-10 bg-transparent text-center font-semibold tabular-nums outline-hidden" />
        <NumberField.Increment aria-label={incrementLabel} className={stepButtonClasses}>
          <Plus aria-hidden className="size-5" />
        </NumberField.Increment>
      </NumberField.Group>
    </NumberField.Root>
  )
}

export default Stepper
