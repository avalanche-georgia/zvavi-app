'use client'

import { useRef, useState } from 'react'
import {
  addYears,
  endOfYear,
  format,
  min as earliest,
  parseISO,
  startOfYear,
  subYears,
} from 'date-fns'
import type { DateRange } from 'react-day-picker'

import {
  type ActiveEnd,
  type DayRange,
  emptyDayRange,
  getInitialEnd,
  isSameRange,
  pickDay,
} from './dayRange'

// Without min / max the calendar still needs an end to navigate to
const yearsBack = 20
const yearsAhead = 5

const toDay = (date: Date) => format(date, 'yyyy-MM-dd')
const toDate = (day: string | null) => (day ? parseISO(day) : undefined)

type UseDateRangePickerParams = {
  max?: string
  min?: string
  onValueChange: (range: DayRange) => void
  today: Date
  value: DayRange
}

// Open state, the end being picked, and the range updates of a DateRangePicker
const useDateRangePicker = ({
  max,
  min,
  onValueChange,
  today,
  value,
}: UseDateRangePickerParams) => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeEnd, setActiveEnd] = useState<ActiveEnd>('new')
  // Bumped by a quick range: the calendar remounts on that range's month
  const [calendarKey, setCalendarKey] = useState(0)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const firstDay = toDate(min ?? null)
  const lastDay = toDate(max ?? null)
  const fromDate = toDate(value.from)
  const toDateValue = toDate(value.to)

  // react-day-picker draws a range from its start; an end-only range shows as that day
  const selected: DateRange | undefined =
    fromDate || toDateValue ? { from: fromDate ?? toDateValue, to: toDateValue } : undefined

  const bounds = {
    disabled: [
      ...(firstDay ? [{ before: firstDay }] : []),
      ...(lastDay ? [{ after: lastDay }] : []),
    ],
    endMonth: lastDay ?? endOfYear(addYears(today, yearsAhead)),
    startMonth:
      firstDay ??
      earliest([startOfYear(subYears(today, yearsBack)), fromDate ?? toDateValue ?? today]),
  }

  const handleOpenChange = (nextIsOpen: boolean) => {
    if (nextIsOpen) {
      setActiveEnd(getInitialEnd(value))
      setCalendarKey(0)
    }

    setIsOpen(nextIsOpen)
  }

  // react-day-picker's own range result is ignored: the clicked day and the active
  // end decide (see pickDay)
  const handleDaySelect = (_range: DateRange | undefined, day: Date) => {
    const { nextEnd, range } = pickDay(value, activeEnd, toDay(day))

    setActiveEnd(nextEnd)
    onValueChange(range)
  }

  const handlePresetSelect = (range: DayRange | null) => {
    onValueChange(range && !isSameRange(range, value) ? range : emptyDayRange)
    setActiveEnd('new')
    setCalendarKey((key) => key + 1)
  }

  const handleEndClear = (end: 'from' | 'to') => {
    onValueChange({ ...value, [end]: null })
    setActiveEnd(end)
  }

  // The × disappears with the range; focus moves to the trigger instead of the page
  const handleClear = () => {
    onValueChange(emptyDayRange)
    triggerRef.current?.focus()
  }

  return {
    activeEnd,
    bounds,
    calendarKey,
    handleClear,
    handleDaySelect,
    handleEndClear,
    handleOpenChange,
    handlePresetSelect,
    isOpen,
    selected,
    setActiveEnd,
    setIsOpen,
    triggerRef,
  }
}

export default useDateRangePicker
