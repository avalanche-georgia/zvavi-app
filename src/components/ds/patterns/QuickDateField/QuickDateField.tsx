'use client'

import { ChipGroup, DatePicker, type DatePickerProps, Field } from '../../primitives'

import { cn } from '@/lib/utils'

export type QuickDate = { label: string; value: string }

// Omit per member of the union, so `withTime` still requires `timeLabel`
type PickerProps = DatePickerProps extends infer Props
  ? Props extends unknown
    ? Omit<Props, 'ariaLabel' | 'className' | 'size'>
    : never
  : never

type QuickDateFieldProps = PickerProps & {
  className?: string
  error?: string
  // Hide the label when a card title already names the field
  isLabelHidden?: boolean
  label: string
  onQuickDateChange: (value: string) => void
  // Shortcuts under the picker, e.g. Tomorrow / In 2 days, or Today / Not sure
  quickDates: QuickDate[]
  // Accessible name of the shortcuts group
  quickDatesLabel: string
  // The shortcut that matches the current value, if any
  selectedQuickDate: string | null
  // The picked date in words, e.g. "Wed, 21 Oct · 18:00 · in 1 day"
  summary?: React.ReactNode
}

// One date (+ time) field with shortcuts: the picker, a row of quick picks and the
// picked date in words. Forms that ask "when" use it so they all work alike.
const QuickDateField = ({
  className,
  error,
  isLabelHidden,
  label,
  onQuickDateChange,
  quickDates,
  quickDatesLabel,
  selectedQuickDate,
  summary,
  ...pickerProps
}: QuickDateFieldProps) => {
  const handleQuickDateChange = (value: string | null) => {
    if (value) onQuickDateChange(value)
  }

  return (
    <Field
      className={className}
      error={error}
      isLabelHidden={isLabelHidden}
      label={label}
      required={pickerProps.required}
    >
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <DatePicker {...pickerProps} />
      <ChipGroup
        ariaLabel={quickDatesLabel}
        className="*:text-copy-sm *:h-8"
        onChange={handleQuickDateChange}
        options={quickDates}
        value={selectedQuickDate}
      />
      <p className={cn('text-caption text-muted', !summary && 'hidden')}>{summary}</p>
    </Field>
  )
}

export default QuickDateField
