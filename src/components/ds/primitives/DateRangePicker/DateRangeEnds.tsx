'use client'

import { format, parseISO } from 'date-fns'
import { X } from 'lucide-react'
import type { Locale } from 'react-day-picker'

import type { ActiveEnd, DayRange } from './dayRange'
import { IconButton } from '../IconButton'

import { cn } from '@/lib/utils'

type End = 'from' | 'to'

type DateRangeEndsProps = {
  activeEnd: ActiveEnd
  clearLabel?: string
  fromLabel: string
  locale: Locale
  onEndClear: (end: End) => void
  onEndSelect: (end: End) => void
  toLabel: string
  value: DayRange
}

// "From" and "To" above the calendar. The highlighted one is set by the next click
// on a day; tapping the other switches to it. Each end clears on its own, which
// leaves an open range ("from 12 Dec", "up to 3 Jan").
const DateRangeEnds = ({
  activeEnd,
  clearLabel,
  fromLabel,
  locale,
  onEndClear,
  onEndSelect,
  toLabel,
  value,
}: DateRangeEndsProps) => {
  const ends: { end: End; label: string }[] = [
    { end: 'from', label: fromLabel },
    { end: 'to', label: toLabel },
  ]

  return (
    <div className="grid grid-cols-2 gap-2">
      {ends.map(({ end, label }) => {
        const day = value[end]
        // A fresh range starts with its start
        const isActive = activeEnd === end || (activeEnd === 'new' && end === 'from')

        return (
          <div key={end} className="relative">
            <button
              aria-pressed={isActive}
              className={cn(
                'focus-ring rounded-control flex h-14 w-full flex-col justify-center border px-3 text-left transition-colors',
                isActive ? 'border-accent bg-accent-soft' : 'border-rule hover:bg-tile',
                day && clearLabel && 'pr-10',
              )}
              onClick={() => onEndSelect(end)}
              type="button"
            >
              <span className="text-caption text-muted">{label}</span>
              <span className={cn('text-copy font-semibold', !day && 'text-placeholder')}>
                {day ? format(parseISO(day), 'd MMM yyyy', { locale }) : '—'}
              </span>
            </button>
            {day && clearLabel && (
              <IconButton
                aria-label={`${clearLabel}: ${label}`}
                className="absolute top-1/2 right-1 -translate-y-1/2"
                onClick={() => onEndClear(end)}
              >
                <X aria-hidden className="size-4" />
              </IconButton>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default DateRangeEnds
