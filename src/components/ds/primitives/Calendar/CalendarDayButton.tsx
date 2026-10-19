'use client'

import { useEffect, useRef } from 'react'
import type { DayButtonProps } from 'react-day-picker'

import { cn } from '@/lib/utils'

// A day of the grid. Single picks and range ends fill with accent; days inside
// a range stay transparent over the cell's soft strip.
const CalendarDayButton = ({ className, day, modifiers, ...props }: DayButtonProps) => {
  const ref = useRef<HTMLButtonElement>(null)
  const isRangeEnd = modifiers.range_start || modifiers.range_end
  const isFilled = modifiers.selected && (isRangeEnd || !modifiers.range_middle)

  // Keyboard navigation moves focus between days (react-day-picker's own button does the same)
  useEffect(() => {
    if (modifiers.focused) ref.current?.focus()
  }, [modifiers.focused])

  return (
    <button
      {...props}
      ref={ref}
      className={cn(
        'focus-ring rounded-control text-copy relative inline-grid size-10 place-items-center transition-colors',
        'disabled:text-disabled disabled:cursor-not-allowed',
        modifiers.today && 'font-semibold',
        isFilled
          ? 'bg-accent hover:bg-accent-hover text-white'
          : 'text-ink enabled:hover:bg-tile-hover',
        modifiers.today && !isFilled && 'text-accent',
        className,
      )}
      data-day={day.isoDate}
    />
  )
}

export default CalendarDayButton
