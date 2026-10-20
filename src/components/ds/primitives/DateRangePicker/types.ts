import type { Locale } from 'react-day-picker'

import type { DayRange } from './dayRange'
import type { ControlSize } from '../Field'

// A quick range, e.g. "Last 30 days" or a month; picking it again clears it
export type DateRangePreset = { label: string; range: DayRange }

export type DateRangePickerProps = {
  // Accessible name of the trigger when no <Field> label names it
  ariaLabel?: string
  // Accessible name of the calendar popup
  calendarLabel: string
  className?: string
  // Shows a × beside the trigger and on each end; its accessible name and tooltip
  clearLabel?: string
  doneLabel: string
  // Trigger text instead of "12 Dec – 3 Jan 2026", e.g. a month's name
  formatValue?: (range: DayRange) => string | null
  fromLabel: string
  // Accent border while the range narrows something down, e.g. a filter
  isActive?: boolean
  // From `react-day-picker/locale`: month names, aria labels, the trigger's dates
  locale: Locale
  // yyyy-MM-dd, the last day that can be picked
  max?: string
  // yyyy-MM-dd, the first day that can be picked
  min?: string
  onValueChange: (range: DayRange) => void
  placeholder?: string
  presets?: DateRangePreset[]
  // Accessible name of the presets group
  presetsLabel?: string
  size?: ControlSize
  // The day counted as today; Georgia's by default
  today?: Date
  toLabel: string
  value: DayRange
}
