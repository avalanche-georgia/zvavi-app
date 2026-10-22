'use client'

import { Select as BaseSelect } from '@base-ui/react/select'
import { ChevronDown } from 'lucide-react'

import type { SelectSize } from './selectClasses'
import SelectPopup from './SelectPopup'
import { controlSizeClasses, fieldControlClasses } from '../Field'

import { cn } from '@/lib/utils'

export type { SelectSize } from './selectClasses'

export type SelectOption<TValue extends string> = {
  label: string
  value: TValue
}

type SelectProps<TValue extends string> = {
  // Accessible name when no <Field> label names it (e.g. in a filter bar)
  ariaLabel?: string
  className?: string
  disabled?: boolean
  // Accent border while it narrows something down, e.g. an applied filter
  isActive?: boolean
  // Phones show only `leading` and the arrow (a toolbar short on room); ignored without `leading`
  isValueHiddenOnPhone?: boolean
  // Decorative icon before the value, e.g. a sort icon
  leading?: React.ReactNode
  onValueChange: (value: TValue) => void
  options: SelectOption<TValue>[]
  placeholder?: string
  size?: SelectSize
  value: TValue | null
}

// Single choice from a short list, in a dropdown. Put it inside <Field> — base-ui
// links the label to the trigger. For a handful of options that fit on screen,
// prefer ChipGroup or SegmentedControl (every option visible at once).
const Select = <TValue extends string>({
  ariaLabel,
  className,
  disabled,
  isActive = false,
  isValueHiddenOnPhone = false,
  leading,
  onValueChange,
  options,
  placeholder,
  size = 'md',
  value,
}: SelectProps<TValue>) => {
  const handleValueChange = (nextValue: TValue | null) => {
    if (nextValue !== null) onValueChange(nextValue)
  }

  return (
    <BaseSelect.Root
      disabled={disabled}
      items={options}
      onValueChange={handleValueChange}
      value={value}
    >
      <BaseSelect.Trigger
        aria-label={ariaLabel}
        className={cn(
          fieldControlClasses,
          'focus-ring flex cursor-pointer items-center justify-between gap-2 text-left',
          'data-popup-open:border-rule-strong',
          controlSizeClasses[size],
          isActive && 'border-accent hover:border-accent data-popup-open:border-accent',
          className,
        )}
      >
        {leading != null && <span className="text-muted flex shrink-0">{leading}</span>}
        <BaseSelect.Value
          className={cn(
            'data-placeholder:text-placeholder truncate',
            leading != null && 'flex-1',
            leading != null && isValueHiddenOnPhone && 'max-sm:sr-only',
          )}
          placeholder={placeholder}
        />
        <BaseSelect.Icon className="text-muted shrink-0">
          <ChevronDown aria-hidden className="size-4.5" />
        </BaseSelect.Icon>
      </BaseSelect.Trigger>
      <SelectPopup options={options} size={size} />
    </BaseSelect.Root>
  )
}

export default Select
