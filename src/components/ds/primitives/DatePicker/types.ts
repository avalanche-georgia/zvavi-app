import type { Locale } from 'react-day-picker'

import type { ControlSize } from '../Field'

export type DatePickerProps = {
  // Accessible name of the trigger when no <Field> label names it
  ariaLabel?: string
  // Accessible name of the calendar popup
  calendarLabel: string
  className?: string
  // Shows a × that empties the value; its accessible name and tooltip
  clearLabel?: string
  // HH:mm a newly picked date starts at, with `withTime`
  defaultTime?: string
  disabled?: boolean
  // From `react-day-picker/locale`: month names, aria labels, the trigger's date
  locale: Locale
  // yyyy-MM-dd, the last day that can be picked
  max?: string
  // yyyy-MM-dd, the first day that can be picked
  min?: string
  onValueChange: (value: Date | null) => void
  placeholder?: string
  size?: ControlSize
  // Accessible name of the time input (the Field label names the date)
  timeLabel?: string
  // Shows a "Today" shortcut under the calendar
  todayLabel?: string
  value: Date | null
  withTime?: boolean
}
