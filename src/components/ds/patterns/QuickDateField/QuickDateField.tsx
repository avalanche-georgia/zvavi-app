'use client'

import { Field as BaseField } from '@base-ui/react/field'

import { ChipGroup, DatePicker, type DatePickerProps, Field } from '../../primitives'

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
  // A control beside the date, e.g. an optional TimeField (`withTime` makes the
  // time required instead)
  time?: React.ReactNode
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
  time,
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
      {/* Own gaps: Field drops its gap when the label is hidden */}
      <div className="flex flex-col gap-2">
        <div className="flex max-w-96 gap-2">
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <DatePicker {...pickerProps} className="min-w-0 flex-1" />
          {/* Its own Field root, so the label keeps naming the date */}
          {time && <BaseField.Root className="shrink-0">{time}</BaseField.Root>}
        </div>
        <ChipGroup
          ariaLabel={quickDatesLabel}
          onChange={handleQuickDateChange}
          options={quickDates}
          value={selectedQuickDate}
        />
        {summary && <p className="text-caption text-muted">{summary}</p>}
      </div>
    </Field>
  )
}

export default QuickDateField
