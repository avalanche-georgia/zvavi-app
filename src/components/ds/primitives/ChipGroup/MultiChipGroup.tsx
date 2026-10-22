'use client'

import { Toggle } from '@base-ui/react/toggle'
import { ToggleGroup } from '@base-ui/react/toggle-group'

import { chipClasses, type ChipSize, chipSizeClasses } from './chipClasses'
import type { ToggleOption } from '../toggle/types'

import { cn } from '@/lib/utils'

type MultiChipGroupProps<T extends string> = {
  ariaLabel?: string
  className?: string
  onChange: (values: T[]) => void
  options: ToggleOption<T>[]
  size?: ChipSize
  value: T[]
}

// Multi-select pill chips (e.g. filters): each chip toggles on its own
const MultiChipGroup = <T extends string>({
  ariaLabel,
  className,
  onChange,
  options,
  size = 'md',
  value,
}: MultiChipGroupProps<T>) => (
  <ToggleGroup
    aria-label={ariaLabel}
    className={cn('flex flex-wrap gap-1.5', className)}
    multiple
    onValueChange={onChange}
    value={value}
  >
    {options.map((option) => (
      <Toggle
        key={option.value}
        aria-label={option.ariaLabel}
        className={cn(chipClasses, chipSizeClasses[size])}
        disabled={option.disabled}
        value={option.value}
      >
        {option.label}
      </Toggle>
    ))}
  </ToggleGroup>
)

export default MultiChipGroup
