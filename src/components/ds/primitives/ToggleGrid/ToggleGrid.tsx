'use client'

import { Toggle } from '@base-ui/react/toggle'
import { ToggleGroup } from '@base-ui/react/toggle-group'

import type { ToggleOption } from '../toggle/types'
import useSingleToggle from '../toggle/useSingleToggle'

import { cn } from '@/lib/utils'

type ToggleGridProps<T extends string> = {
  ariaLabel?: string
  className?: string
  isDeselectable?: boolean
  onChange: (value: T | null) => void
  options: ToggleOption<T>[]
  value: T | null
}

// Single-select tiles in equal columns (one column per option), e.g. a 1–5 scale
const ToggleGrid = <T extends string>({
  ariaLabel,
  className,
  isDeselectable = false,
  onChange,
  options,
  value,
}: ToggleGridProps<T>) => {
  const { groupValue, handleValueChange } = useSingleToggle({ isDeselectable, onChange, value })

  return (
    <ToggleGroup
      aria-label={ariaLabel}
      className={cn('grid auto-cols-fr grid-flow-col gap-1.5', className)}
      onValueChange={handleValueChange}
      value={groupValue}
    >
      {options.map((option) => (
        <Toggle
          key={option.value}
          aria-label={option.ariaLabel}
          className={cn(
            'focus-ring rounded-field bg-tile text-ink flex h-12 items-center justify-center text-base font-semibold',
            'hover:bg-tile-hover transition-colors',
            'data-pressed:bg-accent data-pressed:text-white',
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

export default ToggleGrid
