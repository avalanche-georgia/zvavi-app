'use client'

import { dateMatchModifiers, type Locale, type Matcher } from 'react-day-picker'

import { Button } from '../Button'
import { Calendar } from '../Calendar'

type DatePickerPanelProps = {
  bounds: { disabled: Matcher[]; endMonth: Date; startMonth: Date }
  locale: Locale
  onDaySelect: (day: Date) => void
  today: Date
  todayLabel?: string
  value: Date | null
}

// The popup of a DatePicker: a month grid with month and year selects, and an
// optional "Today" shortcut. It opens with focus on the picked day (or today),
// so keyboard users land on the grid, not the month select.
const DatePickerPanel = ({
  bounds,
  locale,
  onDaySelect,
  today,
  todayLabel,
  value,
}: DatePickerPanelProps) => (
  <div className="flex flex-col gap-3">
    <Calendar
      autoFocus
      captionLayout="dropdown"
      defaultMonth={value ?? undefined}
      disabled={bounds.disabled}
      endMonth={bounds.endMonth}
      locale={locale}
      mode="single"
      onSelect={onDaySelect}
      // Picking the selected day again keeps it; clearing has its own button
      required
      selected={value ?? undefined}
      startMonth={bounds.startMonth}
      today={today}
    />
    {todayLabel && (
      <div className="border-rule flex justify-end border-t pt-3">
        <Button
          disabled={dateMatchModifiers(today, bounds.disabled)}
          onClick={() => onDaySelect(today)}
          size="sm"
          variant="secondary"
        >
          {todayLabel}
        </Button>
      </div>
    )}
  </div>
)

export default DatePickerPanel
