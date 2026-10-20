'use client'

import { format } from 'date-fns'

import DatePickerClearButton from './DatePickerClearButton'
import DatePickerPanel from './DatePickerPanel'
import DatePickerTime from './DatePickerTime'
import DatePickerTrigger from './DatePickerTrigger'
import type { DatePickerProps } from './types'
import useDatePicker from './useDatePicker'
import { Popover } from '../Popover'

import { cn } from '@/lib/utils'

// A date (+ time) field: the trigger opens a calendar in a popover and shows the
// picked date in the page's language. Put it inside <Field> for the label and
// the error state.
const DatePicker = ({
  ariaLabel,
  calendarLabel,
  className,
  clearLabel,
  defaultTime = '18:00',
  disabled = false,
  locale,
  max,
  min,
  onBlur,
  onValueChange,
  placeholder,
  ref,
  required = false,
  size = 'md',
  timeLabel,
  today = new Date(),
  todayLabel,
  value,
  withTime = false,
}: DatePickerProps) => {
  const {
    bounds,
    handleClear,
    handleDaySelect,
    handleTimeChange,
    isOpen,
    setIsOpen,
    setTriggerRef,
    timeText,
  } = useDatePicker({
    defaultTime,
    max,
    min,
    onValueChange,
    ref,
    today,
    value,
    withTime,
  })
  // Only while there is a value to clear
  const activeClearLabel = value && !disabled ? clearLabel : undefined

  return (
    <div className={cn('flex gap-2', className)}>
      <div className="relative min-w-0 flex-1">
        <Popover
          ariaLabel={calendarLabel}
          // The calendar focuses its day itself (autoFocus)
          initialFocus={false}
          isOpen={isOpen}
          onOpenChange={setIsOpen}
          trigger={
            <DatePickerTrigger
              ref={setTriggerRef}
              ariaLabel={ariaLabel}
              disabled={disabled}
              hasClearButton={!!activeClearLabel}
              onBlur={onBlur}
              placeholder={placeholder}
              required={required}
              size={size}
              text={value ? format(value, 'd MMM yyyy', { locale }) : null}
            />
          }
        >
          <DatePickerPanel
            bounds={bounds}
            locale={locale}
            onDaySelect={handleDaySelect}
            today={today}
            todayLabel={todayLabel}
            value={value}
          />
        </Popover>
        {activeClearLabel && (
          <DatePickerClearButton label={activeClearLabel} onClear={handleClear} />
        )}
      </div>
      {withTime && (
        <DatePickerTime
          ariaLabel={timeLabel}
          disabled={disabled || !value}
          onTimeChange={handleTimeChange}
          size={size}
          value={timeText}
        />
      )}
    </div>
  )
}

export default DatePicker
