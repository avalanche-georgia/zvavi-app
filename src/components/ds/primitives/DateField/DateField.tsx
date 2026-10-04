'use client'

import { Input } from '@base-ui/react/input'
import { format, parse } from 'date-fns'

import { fieldControlClasses } from '../Field'

import { cn } from '@/lib/utils'

const dateFormat = 'yyyy-MM-dd'
const timeFormat = 'HH:mm'

type DateFieldProps = {
  className?: string
  // Accessible name of the time input (the Field label names the date input)
  timeLabel?: string
  // yyyy-MM-dd
  min?: string
  onValueChange: (value: Date | null) => void
  required?: boolean
  value: Date | null
  // Adds a time input; a newly picked date starts at `defaultTime`
  withTime?: boolean
  defaultTime?: string
}

// Native date (+ time) inputs. Put it inside <Field> for the label and error wiring.
const DateField = ({
  className,
  defaultTime = '18:00',
  min,
  onValueChange,
  required,
  timeLabel,
  value,
  withTime = false,
}: DateFieldProps) => {
  const dateText = value ? format(value, dateFormat) : ''
  const timeText = value ? format(value, timeFormat) : defaultTime

  const handleDateChange = (nextDate: string) => {
    if (!nextDate) return onValueChange(null)

    const time = withTime ? timeText : '00:00'

    onValueChange(parse(`${nextDate} ${time}`, `${dateFormat} ${timeFormat}`, new Date()))
  }

  const handleTimeChange = (nextTime: string) => {
    if (!value || !nextTime) return

    onValueChange(parse(`${dateText} ${nextTime}`, `${dateFormat} ${timeFormat}`, new Date()))
  }

  return (
    <div className={cn('flex gap-2', className)}>
      <Input
        className={cn(fieldControlClasses, 'focus-ring h-11.5 px-3')}
        min={min}
        onValueChange={handleDateChange}
        required={required}
        type="date"
        value={dateText}
      />
      {withTime && (
        <Input
          aria-label={timeLabel}
          className={cn(fieldControlClasses, 'focus-ring h-11.5 w-34 shrink-0 px-3')}
          disabled={!value}
          onValueChange={handleTimeChange}
          type="time"
          value={timeText}
        />
      )}
    </div>
  )
}

export default DateField
