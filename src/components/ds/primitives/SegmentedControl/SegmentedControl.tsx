'use client'

import { Toggle } from '@base-ui/react/toggle'
import { ToggleGroup } from '@base-ui/react/toggle-group'

import type { ToggleOption } from '../toggle/types'
import useSingleToggle from '../toggle/useSingleToggle'

import { cn } from '@/lib/utils'

export type SegmentedControlSize = 'md' | 'sm'

type SegmentedControlProps<T extends string> = {
  ariaLabel: string
  className?: string
  disabled?: boolean
  onChange: (value: T) => void
  options: ToggleOption<T>[]
  // md: form control (46px). sm: compact toolbar switch (34px), e.g. the header language switch
  size?: SegmentedControlSize
  value: T
}

const trackSizeClasses: Record<SegmentedControlSize, string> = {
  md: 'rounded-field h-11.5',
  sm: 'rounded-control h-8.5',
}

const segmentSizeClasses: Record<SegmentedControlSize, string> = {
  md: 'text-copy rounded-lg px-2',
  sm: 'text-caption rounded-lg px-2.5',
}

// Always exactly one option active — pressing the active one keeps it
const SegmentedControl = <T extends string>({
  ariaLabel,
  className,
  disabled,
  onChange,
  options,
  size = 'md',
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
      // The track sets the height (override via className); segments fill it
      className={cn('bg-tile flex gap-0.75 p-0.75', trackSizeClasses[size], className)}
      disabled={disabled}
      onValueChange={handleValueChange}
      value={groupValue}
    >
      {options.map((option) => (
        <Toggle
          key={option.value}
          aria-label={option.ariaLabel}
          className={cn(
            'focus-ring text-body flex h-full flex-1 items-center justify-center gap-1.5 whitespace-nowrap',
            segmentSizeClasses[size],
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
