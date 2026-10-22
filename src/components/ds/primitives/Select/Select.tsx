'use client'

import { Select as BaseSelect } from '@base-ui/react/select'
import { Check, ChevronDown } from 'lucide-react'

import { itemSizeClasses, type SelectSize } from './selectClasses'
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
        <BaseSelect.Value
          className="data-placeholder:text-placeholder truncate"
          placeholder={placeholder}
        />
        <BaseSelect.Icon className="text-muted shrink-0">
          <ChevronDown aria-hidden className="size-4.5" />
        </BaseSelect.Icon>
      </BaseSelect.Trigger>
      <BaseSelect.Portal>
        <BaseSelect.Positioner
          alignItemWithTrigger={false}
          className="z-50"
          collisionPadding={16}
          sideOffset={6}
        >
          <BaseSelect.Popup className="rounded-media border-rule bg-surface shadow-menu max-h-(--available-height) min-w-(--anchor-width) overflow-y-auto border p-1 outline-hidden">
            {options.map((option) => (
              <BaseSelect.Item
                key={option.value}
                className={cn(
                  'rounded-item text-ink data-highlighted:bg-tile flex cursor-pointer items-center justify-between gap-3 px-3 outline-hidden select-none',
                  itemSizeClasses[size],
                )}
                value={option.value}
              >
                <BaseSelect.ItemText>{option.label}</BaseSelect.ItemText>
                <BaseSelect.ItemIndicator className="text-accent">
                  <Check aria-hidden className="size-4" strokeWidth={2.5} />
                </BaseSelect.ItemIndicator>
              </BaseSelect.Item>
            ))}
          </BaseSelect.Popup>
        </BaseSelect.Positioner>
      </BaseSelect.Portal>
    </BaseSelect.Root>
  )
}

export default Select
