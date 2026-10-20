'use client'

import { useRef, useState } from 'react'
import {
  addYears,
  endOfYear,
  format,
  isAfter,
  isBefore,
  min as earliest,
  parseISO,
  setHours,
  setMinutes,
  startOfDay,
  startOfYear,
  subYears,
} from 'date-fns'

const timeFormat = 'HH:mm'

// Without min / max the month and year selects still need an end
const yearsBack = 20
const yearsAhead = 5

const atTime = (day: Date, time: string) => {
  const [hours, minutes] = time.split(':').map(Number)

  return setMinutes(setHours(startOfDay(day), hours), minutes)
}

type UseDatePickerParams = {
  defaultTime: string
  max?: string
  min?: string
  onValueChange: (value: Date | null) => void
  value: Date | null
  withTime: boolean
}

// Open state, the allowed days and the value updates of a DatePicker. A picked
// day keeps the time already set (or `defaultTime`); without a time it's midnight.
const useDatePicker = ({
  defaultTime,
  max,
  min,
  onValueChange,
  value,
  withTime,
}: UseDatePickerParams) => {
  const [isOpen, setIsOpen] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const today = new Date()
  const firstDay = min ? parseISO(min) : undefined
  const lastDay = max ? parseISO(max) : undefined
  const timeText = value ? format(value, timeFormat) : defaultTime

  const isAllowed = (day: Date) =>
    !(firstDay && isBefore(day, firstDay)) && !(lastDay && isAfter(startOfDay(day), lastDay))

  const bounds = {
    disabled: [
      ...(firstDay ? [{ before: firstDay }] : []),
      ...(lastDay ? [{ after: lastDay }] : []),
    ],
    endMonth: lastDay ?? endOfYear(addYears(today, yearsAhead)),
    // A saved value older than the default range stays reachable
    startMonth: firstDay ?? earliest([startOfYear(subYears(today, yearsBack)), value ?? today]),
  }

  const handleDaySelect = (day: Date) => {
    onValueChange(withTime ? atTime(day, timeText) : startOfDay(day))
    setIsOpen(false)
  }

  const handleTimeChange = (time: string) => {
    if (!value || !time) return

    onValueChange(atTime(value, time))
  }

  const handleClear = () => onValueChange(null)

  // Keyboard users land on the picked day (or today), not the month select
  const getInitialFocus = () =>
    panelRef.current?.querySelector<HTMLElement>('button[data-day][tabindex="0"]') ?? true

  return {
    bounds,
    getInitialFocus,
    handleClear,
    handleDaySelect,
    handleTimeChange,
    isOpen,
    isTodayAllowed: isAllowed(today),
    panelRef,
    setIsOpen,
    timeText,
  }
}

export default useDatePicker
