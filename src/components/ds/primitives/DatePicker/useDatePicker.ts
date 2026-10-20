'use client'

import { useRef, useState } from 'react'
import {
  addYears,
  endOfYear,
  min as earliest,
  parseISO,
  startOfDay,
  startOfYear,
  subYears,
} from 'date-fns'

import { assignRef } from '@/lib/assignRef'
import {
  atTbilisiTime,
  formatTbilisi,
  getTbilisiToday,
  toTbilisiWallClock,
} from '@/lib/tbilisiTime'

// Without min / max the month and year selects still need an end
const yearsBack = 20
const yearsAhead = 5

type UseDatePickerParams = {
  // HH:mm a newly picked date starts at
  defaultTime?: string
  max?: string
  min?: string
  onValueChange: (value: Date | null) => void
  ref?: React.Ref<HTMLButtonElement>
  // Georgia's today by default
  today?: Date
  value: Date | null
  withTime: boolean
}

// Open state, the allowed days and the value updates of a DatePicker. With a time
// the value is a moment, read and set in Georgian time (a picked day keeps the
// time already set, or `defaultTime`); without one it's a calendar day at midnight.
const useDatePicker = ({
  defaultTime = '18:00',
  max,
  min,
  onValueChange,
  ref,
  today = getTbilisiToday(),
  value,
  withTime,
}: UseDatePickerParams) => {
  const [isOpen, setIsOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const firstDay = min ? parseISO(min) : undefined
  const lastDay = max ? parseISO(max) : undefined
  // The calendar day shown and picked: Georgia's day of a moment, or the day itself
  const day = value && withTime ? startOfDay(toTbilisiWallClock(value)) : value
  const timeText = value && withTime ? formatTbilisi(value, 'HH:mm') : defaultTime

  const bounds = {
    disabled: [
      ...(firstDay ? [{ before: firstDay }] : []),
      ...(lastDay ? [{ after: lastDay }] : []),
    ],
    endMonth: lastDay ?? endOfYear(addYears(today, yearsAhead)),
    // A saved value older than the default range stays reachable
    startMonth: firstDay ?? earliest([startOfYear(subYears(today, yearsBack)), day ?? today]),
  }

  const handleDaySelect = (pickedDay: Date) => {
    onValueChange(withTime ? atTbilisiTime(pickedDay, timeText) : startOfDay(pickedDay))
    setIsOpen(false)
  }

  const handleTimeChange = (time: string | null) => {
    if (!day || !time) return

    onValueChange(atTbilisiTime(day, time))
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
    day,
    handleClear,
    handleDaySelect,
    handleTimeChange,
    isOpen,
    setIsOpen,
    setTriggerRef,
    timeText,
    today,
  }
}

export default useDatePicker
