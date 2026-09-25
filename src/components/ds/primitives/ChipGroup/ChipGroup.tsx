'use client'

import { Toggle } from '@base-ui/react/toggle'
import { ToggleGroup } from '@base-ui/react/toggle-group'

import type { ToggleOption } from '../toggle/types'
import useSingleToggle from '../toggle/useSingleToggle'

import { cn } from '@/lib/utils'

type ChipGroupProps<T extends string> = {
  ariaLabel?: string
  className?: string
  isDeselectable?: boolean
  onChange: (value: T | null) => void
  options: ToggleOption<T>[]
  value: T | null
}

// Single-select pill chips that wrap onto new lines
const ChipGroup = <T extends string>({
  ariaLabel,
  className,
  isDeselectable = false,
  onChange,
  options,
  value,
}: ChipGroupProps<T>) => {
  const { groupValue, handleValueChange } = useSingleToggle({ isDeselectable, onChange, value })

  return (
    <ToggleGroup
      aria-label={ariaLabel}
      className={cn('flex flex-wrap gap-1.5', className)}
      onValueChange={handleValueChange}
      value={groupValue}
    >
      {options.map((option) => (
        <Toggle
          key={option.value}
          aria-label={option.ariaLabel}
          className={cn(
            'focus-ring border-rule bg-surface text-copy text-ink flex min-h-10.5 items-center gap-1.5 rounded-full border px-3.5',
            'hover:border-rule-strong font-medium transition-colors',
            'data-pressed:border-accent data-pressed:bg-accent data-pressed:text-white',
            'data-disabled:text-disabled data-disabled:cursor-not-allowed',
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

export default ChipGroup
