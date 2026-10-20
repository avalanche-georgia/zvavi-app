'use client'

import type { Locale, Matcher } from 'react-day-picker'

import { Button } from '../Button'
import { Calendar } from '../Calendar'

type DatePickerPanelProps = {
  bounds: { disabled: Matcher[]; endMonth: Date; startMonth: Date }
  isTodayAllowed: boolean
  locale: Locale
  onDaySelect: (day: Date) => void
  ref: React.Ref<HTMLDivElement>
  todayLabel?: string
  value: Date | null
}

// The popup of a DatePicker: a month grid with month and year selects, and an
// optional "Today" shortcut
const DatePickerPanel = ({
  bounds,
  isTodayAllowed,
  locale,
  onDaySelect,
  ref,
  todayLabel,
  value,
}: DatePickerPanelProps) => (
  <div ref={ref} className="flex flex-col gap-3">
    <Calendar
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
    />
    {todayLabel && (
      <div className="border-rule flex justify-end border-t pt-3">
        <Button
          disabled={!isTodayAllowed}
          onClick={() => onDaySelect(new Date())}
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
