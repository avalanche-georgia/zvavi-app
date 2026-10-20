/* eslint-disable react/jsx-props-no-spreading */

import { Field as BaseField } from '@base-ui/react/field'
import { format } from 'date-fns'
import { CalendarDays } from 'lucide-react'
import type { Locale } from 'react-day-picker'

import { type ControlSize, controlSizeClasses, fieldControlClasses } from '../Field'

import { cn } from '@/lib/utils'

const displayFormat = 'd MMM yyyy'

// Popover.Trigger adds its own props (onClick, aria-expanded, ref, …) at runtime
type DatePickerTriggerProps = Omit<
  React.ComponentProps<typeof BaseField.Control>,
  'className' | 'render' | 'size' | 'value'
> & {
  ariaLabel?: string
  hasClearButton: boolean
  locale: Locale
  placeholder?: string
  size: ControlSize
  value: Date | null
}

// The field-like button of a DatePicker. Field.Control links the <Field> label,
// error and disabled state to it; Popover.Trigger passes its props through.
const DatePickerTrigger = ({
  ariaLabel,
  hasClearButton,
  locale,
  placeholder,
  size,
  value,
  ...props
}: DatePickerTriggerProps) => (
  <BaseField.Control
    {...props}
    aria-label={ariaLabel}
    className={cn(
      fieldControlClasses,
      controlSizeClasses[size],
      'focus-ring data-popup-open:border-rule-strong flex cursor-pointer items-center gap-2 text-left',
      hasClearButton && 'pr-11',
    )}
    render={<button type="button" />}
  >
    <CalendarDays aria-hidden className="text-muted size-4.5 shrink-0" />
    <span className={cn('truncate', !value && 'text-placeholder')}>
      {value ? format(value, displayFormat, { locale }) : placeholder}
    </span>
  </BaseField.Control>
)

export default DatePickerTrigger
