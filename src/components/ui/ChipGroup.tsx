'use client'

import { Toggle } from '@base-ui/react/toggle'
import { ToggleGroup } from '@base-ui/react/toggle-group'

import type { ToggleOption } from './SegmentedControl'

import { cn } from '@/lib/utils'

type ChipGroupProps<T extends string> = {
  ariaLabel: string
  className?: string
  onChange: (value: T) => void
  options: ToggleOption<T>[]
  value: T
}

// Single-select pill chips in a row that scrolls sideways when it overflows.
/** @deprecated Use `ChipGroup` from `@ds/primitives` — see DESIGN_SYSTEM.md */
const ChipGroup = <T extends string>({
  ariaLabel,
  className,
  onChange,
  options,
  value,
}: ChipGroupProps<T>) => {
  const handleValueChange = (values: T[]) => {
    if (values[0]) onChange(values[0])
  }

  return (
    <ToggleGroup
      aria-label={ariaLabel}
      className={cn('scrollbar-hide flex gap-1.5 overflow-x-auto', className)}
      onValueChange={handleValueChange}
      value={[value]}
    >
      {options.map((option) => (
        <Toggle
          key={option.value}
          aria-label={option.ariaLabel}
          className={cn(
            'border-rule flex h-8.5 shrink-0 items-center rounded-full border bg-white px-3.25',
            'text-[13px] font-semibold whitespace-nowrap transition-colors',
            'hover:bg-tile focus-visible:outline-accent focus-visible:outline-2',
            'data-pressed:border-ink data-pressed:bg-ink data-pressed:text-white',
          )}
          value={option.value}
        >
          {option.label}
        </Toggle>
      ))}
    </ToggleGroup>
  )
}

export default ChipGroup
