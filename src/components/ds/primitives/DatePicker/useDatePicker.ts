'use client'

import { useRef, useState } from 'react'
import {
  addYears,
  endOfYear,
  format,
  min as earliest,
  parseISO,
  setHours,
  setMinutes,
  startOfDay,
  startOfYear,
  subYears,
} from 'date-fns'

import { assignRef } from '@/lib/assignRef'

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
  ref?: React.Ref<HTMLButtonElement>
  today: Date
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
  ref,
  today,
  value,
  withTime,
}: UseDatePickerParams) => {
  const [isOpen, setIsOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const firstDay = min ? parseISO(min) : undefined
  const lastDay = max ? parseISO(max) : undefined
  const timeText = value ? format(value, timeFormat) : defaultTime

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

  const handleTimeChange = (time: string | null) => {
    if (!value || !time) return

    onValueChange(atTime(value, time))
  }

  // The × disappears with the value; focus moves to the trigger instead of the page
  const handleClear = () => {
    onValueChange(null)
    triggerRef.current?.focus()
  }

  // Ours (focus after clearing) and the caller's (e.g. react-hook-form)
  const setTriggerRef = (node: HTMLButtonElement | null) => {
    triggerRef.current = node
    assignRef(ref, node)
  }

  return {
    bounds,
    handleClear,
    handleDaySelect,
    handleTimeChange,
    isOpen,
    setIsOpen,
    setTriggerRef,
    timeText,
  }
}

export default useDatePicker
