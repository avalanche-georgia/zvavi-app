'use client'

import { Toggle } from '@base-ui/react/toggle'
import { ToggleGroup } from '@base-ui/react/toggle-group'

import type { ToggleOption } from '../toggle/types'
import useSingleToggle from '../toggle/useSingleToggle'

import { cn } from '@/lib/utils'

type SegmentedControlProps<T extends string> = {
  ariaLabel: string
  className?: string
  onChange: (value: T) => void
  options: ToggleOption<T>[]
  value: T
}

// Always exactly one option active — pressing the active one keeps it
const SegmentedControl = <T extends string>({
  ariaLabel,
  className,
  onChange,
  options,
  value,
}: SegmentedControlProps<T>) => {
  const { groupValue, handleValueChange } = useSingleToggle<T>({
    isDeselectable: false,
    onChange: (nextValue) => nextValue && onChange(nextValue),
    value,
  })

  return (
    <ToggleGroup
      aria-label={ariaLabel}
      className={cn('rounded-field bg-tile flex gap-0.75 p-0.75', className)}
      onValueChange={handleValueChange}
      value={groupValue}
    >
      {options.map((option) => (
        <Toggle
          key={option.value}
          aria-label={option.ariaLabel}
          className={cn(
            'focus-ring text-copy text-body flex h-10 flex-1 items-center justify-center gap-1.5 rounded-lg px-3',
            'font-semibold transition-colors',
            'data-pressed:bg-surface data-pressed:text-ink data-pressed:shadow-raised',
            'data-disabled:text-placeholder data-disabled:cursor-default',
          )}
          disabled={option.disabled}
          value={option.value}
        >
          {option.label}
        </Toggle>
      ))}
    </ToggleGroup>
  )
}

export default SegmentedControl
