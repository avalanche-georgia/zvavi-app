'use client'

import { X } from 'lucide-react'

import DatePickerPanel from './DatePickerPanel'
import DatePickerTime from './DatePickerTime'
import DatePickerTrigger from './DatePickerTrigger'
import type { DatePickerProps } from './types'
import useDatePicker from './useDatePicker'
import { IconButton } from '../IconButton'
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
  onValueChange,
  placeholder,
  size = 'md',
  timeLabel,
  todayLabel,
  value,
  withTime = false,
}: DatePickerProps) => {
  const {
    bounds,
    getInitialFocus,
    handleClear,
    handleDaySelect,
    handleTimeChange,
    isOpen,
    isTodayAllowed,
    panelRef,
    setIsOpen,
    timeText,
  } = useDatePicker({ defaultTime, max, min, onValueChange, value, withTime })
  const isClearable = !!clearLabel && !!value && !disabled

  return (
    <div className={cn('flex gap-2', className)}>
      <div className="relative min-w-0 flex-1">
        <Popover
          ariaLabel={calendarLabel}
          initialFocus={getInitialFocus}
          isOpen={isOpen}
          onOpenChange={setIsOpen}
          trigger={
            <DatePickerTrigger
              ariaLabel={ariaLabel}
              disabled={disabled}
              hasClearButton={isClearable}
              locale={locale}
              placeholder={placeholder}
              size={size}
              value={value}
            />
          }
        >
          <DatePickerPanel
            ref={panelRef}
            bounds={bounds}
            isTodayAllowed={isTodayAllowed}
            locale={locale}
            onDaySelect={handleDaySelect}
            todayLabel={todayLabel}
            value={value}
          />
        </Popover>
        {isClearable && (
          <IconButton
            aria-label={clearLabel}
            className="absolute top-1/2 right-1 -translate-y-1/2"
            onClick={handleClear}
          >
            <X aria-hidden className="size-4" />
          </IconButton>
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
