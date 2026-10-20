/* eslint-disable react/jsx-props-no-spreading */

import { Field as BaseField } from '@base-ui/react/field'
import { CalendarDays } from 'lucide-react'

import { type ControlSize, controlSizeClasses, fieldControlClasses } from '../Field'

import { cn } from '@/lib/utils'

// Popover.Trigger adds its own props (onClick, aria-expanded, ref, …) at runtime
type DatePickerTriggerProps = Omit<
  React.ComponentProps<typeof BaseField.Control>,
  'className' | 'ref' | 'render' | 'size' | 'value'
> & {
  ariaLabel?: string
  hasClearButton: boolean
  // Accent border while it narrows something down, e.g. an applied filter
  isActive?: boolean
  placeholder?: string
  ref?: React.Ref<HTMLButtonElement>
  size: ControlSize
  // The picked date(s), formatted; null shows the placeholder
  text: string | null
}

// The field-like button of a DatePicker or DateRangePicker. Field.Control links the <Field> label,
// error and disabled state to it; Popover.Trigger passes its props through. A
// combobox, like a select: the label names it and the date is read as its value.
const DatePickerTrigger = ({
  ariaLabel,
  hasClearButton,
  isActive = false,
  placeholder,
  ref,
  required,
  size,
  text,
  ...props
}: DatePickerTriggerProps) => (
  <BaseField.Control
    {...props}
    // Field.Control types its element as an <input>; here it renders a <button>
    ref={ref as React.Ref<HTMLInputElement>}
    aria-haspopup="dialog"
    aria-label={ariaLabel}
    aria-required={required || undefined}
    className={cn(
      fieldControlClasses,
      controlSizeClasses[size],
      'focus-ring data-popup-open:border-rule-strong flex cursor-pointer items-center gap-2 text-left',
      hasClearButton && 'pr-11',
      isActive && 'border-accent hover:border-accent data-popup-open:border-accent',
    )}
    // eslint-disable-next-line jsx-a11y/role-has-required-aria-props
    render={<button role="combobox" type="button" />}
  >
    <CalendarDays aria-hidden className="text-muted size-4.5 shrink-0" />
    <span className={cn('truncate', !text && 'text-placeholder')}>{text ?? placeholder}</span>
  </BaseField.Control>
)

export default DatePickerTrigger
