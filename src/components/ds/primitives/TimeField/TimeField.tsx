'use client'

import { useRef } from 'react'
import { Autocomplete } from '@base-ui/react/autocomplete'
import { Clock } from 'lucide-react'

import { getTimeOptions } from './timeOptions'
import useTimeField from './useTimeField'
import { type ControlSize, controlSizeClasses, fieldControlClasses } from '../Field'

import { cn } from '@/lib/utils'

type TimeFieldProps = {
  // Accessible name when no <Field> label names it
  ariaLabel?: string
  className?: string
  disabled?: boolean
  // HH:mm; null when the field is emptied
  onValueChange: (time: string | null) => void
  size?: ControlSize
  // Minutes between the listed times
  step?: number
  // HH:mm, or null for no time
  value: string | null
}

// A 24-hour time: pick one from the list or type any time ("1745", "9", "18:30").
// Inside <Field> the label and error reach it like any input.
const TimeField = ({
  ariaLabel,
  className,
  disabled = false,
  onValueChange,
  size = 'md',
  step = 30,
  value,
}: TimeFieldProps) => {
  const popupRef = useRef<HTMLDivElement>(null)
  const { commit, filterTime, handleKeyDown, handleTextChange, isInvalid, setHighlighted, text } =
    useTimeField({ onValueChange, value })

  // Opening on the current time, not on midnight
  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen || !value) return
    requestAnimationFrame(() =>
      popupRef.current
        ?.querySelector(`[data-time="${value}"]`)
        ?.scrollIntoView?.({ block: 'center' }),
    )
  }

  return (
    <Autocomplete.Root
      disabled={disabled}
      filter={filterTime}
      items={getTimeOptions(step)}
      onItemHighlighted={setHighlighted}
      onOpenChange={handleOpenChange}
      onValueChange={(nextText, details) => handleTextChange(nextText, details.reason)}
      openOnInputClick
      value={text}
    >
      <div className={cn('relative w-28 shrink-0', className)}>
        <Autocomplete.Input
          aria-invalid={isInvalid || undefined}
          aria-label={ariaLabel}
          autoComplete="off"
          className={cn(
            fieldControlClasses,
            controlSizeClasses[size],
            'focus-ring aria-invalid:border-danger in-data-invalid:border-danger pr-9 tabular-nums',
          )}
          inputMode="numeric"
          maxLength={5}
          onBlur={commit}
          onKeyDown={handleKeyDown}
          placeholder="HH:mm"
        />
        <Clock
          aria-hidden
          className="text-muted pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2"
        />
      </div>
      <Autocomplete.Portal>
        <Autocomplete.Positioner className="z-50" collisionPadding={16} sideOffset={6}>
          <Autocomplete.Popup
            ref={popupRef}
            className="rounded-field border-rule bg-surface shadow-overlay max-h-64 min-w-(--anchor-width) overflow-y-auto border p-1 outline-hidden data-empty:hidden"
          >
            <Autocomplete.List>
              {(time: string) => (
                <Autocomplete.Item
                  key={time}
                  className={cn(
                    'rounded-control text-copy data-highlighted:bg-tile cursor-pointer px-3 py-2 tabular-nums outline-hidden select-none',
                    time === value && 'text-accent font-semibold',
                  )}
                  data-time={time}
                  value={time}
                >
                  {time}
                </Autocomplete.Item>
              )}
            </Autocomplete.List>
          </Autocomplete.Popup>
        </Autocomplete.Positioner>
      </Autocomplete.Portal>
    </Autocomplete.Root>
  )
}

export default TimeField
