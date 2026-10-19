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
        'focus-ring rounded-control text-copy text-ink relative inline-grid size-10 place-items-center transition-colors',
        modifiers.today && 'text-accent font-semibold',
        modifiers.outside && 'text-muted',
        isFilled && 'bg-accent hover:bg-accent-hover text-white',
        !isFilled && !modifiers.disabled && 'hover:bg-tile-hover',
        // From modifiers, not :disabled — react-day-picker drops the attribute
        // while a disabled day has keyboard focus
        modifiers.disabled && 'text-disabled cursor-not-allowed',
        className,
      )}
      data-day={day.isoDate}
    />
  )
}

export default CalendarDayButton
