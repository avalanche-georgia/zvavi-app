'use client'

import { Toggle } from '@base-ui/react/toggle'
import { ToggleGroup } from '@base-ui/react/toggle-group'

import { cn } from '@/lib/utils'

export type ToggleOption<T extends string> = {
  // Required when the label is an icon only
  ariaLabel?: string
  label: React.ReactNode
  value: T
}

type SegmentedControlProps<T extends string> = {
  ariaLabel: string
  className?: string
  onChange: (value: T) => void
  options: ToggleOption<T>[]
  value: T
}

// Single-select, always one option active — pressing the active one keeps it.
const SegmentedControl = <T extends string>({
  ariaLabel,
  className,
  onChange,
  options,
  value,
}: SegmentedControlProps<T>) => {
  const handleValueChange = (values: T[]) => {
    if (values[0]) onChange(values[0])
  }

  return (
    <ToggleGroup
      aria-label={ariaLabel}
      className={cn('bg-tile flex gap-0.75 rounded-[11px] p-0.75', className)}
      onValueChange={handleValueChange}
      value={[value]}
    >
      {options.map((option) => (
        <Toggle
          key={option.value}
          aria-label={option.ariaLabel}
          className={cn(
            'text-body flex h-9 flex-1 items-center justify-center gap-1.5 rounded-lg px-3 text-sm font-semibold',
            'focus-visible:outline-accent transition-colors focus-visible:outline-2',
            'data-pressed:text-ink data-pressed:bg-white',
            'data-pressed:shadow-[0_1px_2px_rgba(0,0,0,.08),0_0_0_1px_rgba(0,0,0,.04)]',
          )}
          value={option.value}
        >
          {option.label}
        </Toggle>
      ))}
    </ToggleGroup>
  )
}

export default SegmentedControl
