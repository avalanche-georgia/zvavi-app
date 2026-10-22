'use client'

import { Radio } from '@base-ui/react/radio'
import { RadioGroup as BaseRadioGroup } from '@base-ui/react/radio-group'

import { cn } from '@/lib/utils'

export type RadioOption<T extends string> = {
  disabled?: boolean
  label: React.ReactNode
  value: T
}

type RadioGroupProps<T extends string> = {
  ariaLabel?: string
  className?: string
  onChange: (value: T) => void
  options: RadioOption<T>[]
  value: T | null
}

// Single choice, one option per row — for labels too long for ChipGroup / SegmentedControl
const RadioGroup = <T extends string>({
  ariaLabel,
  className,
  onChange,
  options,
  value,
}: RadioGroupProps<T>) => {
  const handleValueChange = (nextValue: unknown) => onChange(nextValue as T)

  return (
    <BaseRadioGroup
      aria-label={ariaLabel}
      className={cn('flex flex-col items-start gap-1', className)}
      onValueChange={handleValueChange}
      value={value}
    >
      {options.map((option) => (
        // Hugs circle + text for a mouse; grows to a 44px row on touch screens
        <label
          key={option.value}
          className="group/choice text-ink has-data-disabled:text-disabled flex cursor-pointer items-center gap-3 py-0.5 has-data-disabled:cursor-not-allowed pointer-coarse:min-h-11"
        >
          <Radio.Root
            className={cn(
              'focus-ring border-rule-strong bg-surface flex size-5 shrink-0 items-center justify-center rounded-full border transition-colors',
              // Hovering the label text highlights the circle too
              'group-hover/choice:not-data-checked:not-data-disabled:border-muted data-checked:border-accent data-checked:bg-accent',
              'data-disabled:border-rule data-disabled:bg-off',
            )}
            disabled={option.disabled}
            value={option.value}
          >
            <Radio.Indicator className="size-2 rounded-full bg-white" />
          </Radio.Root>
          {/* Colour from the label, so a disabled option greys out */}
          <span className="text-copy font-medium">{option.label}</span>
        </label>
      ))}
    </BaseRadioGroup>
  )
}

export default RadioGroup
