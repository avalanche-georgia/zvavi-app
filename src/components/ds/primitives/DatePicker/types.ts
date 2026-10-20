import type { Locale } from 'react-day-picker'

import type { ControlSize } from '../Field'

// A time input needs its own name: the <Field> label names the date
type DatePickerTimeOptions =
  | {
      // HH:mm a newly picked date starts at
      defaultTime?: string
      // Accessible name of the time input
      timeLabel: string
      withTime: true
    }
  | { defaultTime?: never; timeLabel?: never; withTime?: false }

export type DatePickerProps = DatePickerTimeOptions & {
  // Accessible name of the trigger when no <Field> label names it
  ariaLabel?: string
  // Accessible name of the calendar popup
  calendarLabel: string
  className?: string
  // Shows a × that empties the value; its accessible name and tooltip
  clearLabel?: string
  disabled?: boolean
  // From `react-day-picker/locale`: month names, aria labels, the trigger's date
  locale: Locale
  // yyyy-MM-dd, the last day that can be picked
  max?: string
  // yyyy-MM-dd, the first day that can be picked
  min?: string
  // Focus left the trigger (react-hook-form's onBlur)
  onBlur?: VoidFunction
  onValueChange: (value: Date | null) => void
  placeholder?: string
  // The trigger, e.g. for react-hook-form to focus the first invalid field
  ref?: React.Ref<HTMLButtonElement>
  required?: boolean
  size?: ControlSize
  // The day counted as today (highlight, Today shortcut); Georgia's by default
  today?: Date
  // Shows a "Today" shortcut under the calendar
  todayLabel?: string
  value: Date | null
}
