'use client'

import { useState } from 'react'

import { parseTime } from './parseTime'
import { type ControlSize, controlSizeClasses, fieldControlClasses } from '../Field'

import { cn } from '@/lib/utils'

type DatePickerTimeProps = {
  ariaLabel?: string
  disabled: boolean
  onTimeChange: (time: string) => void
  size: ControlSize
  // HH:mm
  value: string
}

// The time beside a DatePicker, always 24-hour (a native time input follows the
// browser's 12 / 24-hour setting, not the page). Typing is free; leaving the
// field or pressing Enter applies it, and anything that isn't a time goes back.
// A plain <input>, not Field.Control: the <Field> label keeps naming the date.
const DatePickerTime = ({
  ariaLabel,
  disabled,
  onTimeChange,
  size,
  value,
}: DatePickerTimeProps) => {
  const [draft, setDraft] = useState<string | null>(null)
  const isInvalid = draft !== null && draft.trim() !== '' && parseTime(draft) === null

  const commit = () => {
    const time = draft === null ? null : parseTime(draft)

    if (time && time !== value) onTimeChange(time)
    setDraft(null)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => setDraft(event.target.value)

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') commit()
    if (event.key === 'Escape') setDraft(null)
  }

  return (
    <input
      aria-invalid={isInvalid || undefined}
      aria-label={ariaLabel}
      autoComplete="off"
      className={cn(
        fieldControlClasses,
        controlSizeClasses[size],
        'focus-ring placeholder:text-placeholder aria-invalid:border-danger w-24 shrink-0 tabular-nums',
      )}
      data-disabled={disabled ? '' : undefined}
      disabled={disabled}
      inputMode="numeric"
      maxLength={5}
      onBlur={commit}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      placeholder="HH:mm"
      value={draft ?? value}
    />
  )
}

export default DatePickerTime
