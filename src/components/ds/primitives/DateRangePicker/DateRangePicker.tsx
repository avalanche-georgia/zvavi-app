'use client'

import DateRangePanel from './DateRangePanel'
import { formatDayRange } from './formatDayRange'
import type { DateRangePickerProps } from './types'
import useDateRangePicker from './useDateRangePicker'
import DatePickerClearButton from '../DatePicker/DatePickerClearButton'
import DatePickerTrigger from '../DatePicker/DatePickerTrigger'
import { Popover } from '../Popover'

import { getTbilisiToday } from '@/lib/tbilisiTime'
import { cn } from '@/lib/utils'

// A date range in one field: from–to, from only, or up to a date. The popup has
// quick ranges, the two ends (tap one to set it next) and a range calendar.
const DateRangePicker = ({
  ariaLabel,
  calendarLabel,
  className,
  clearLabel,
  doneLabel,
  formatValue,
  fromLabel,
  isActive = false,
  locale,
  max,
  min,
  onValueChange,
  placeholder,
  presets,
  presetsLabel,
  size = 'md',
  toLabel,
  today = getTbilisiToday(),
  value,
}: DateRangePickerProps) => {
  const {
    activeEnd,
    bounds,
    calendarKey,
    handleClear,
    handleDaySelect,
    handleEndClear,
    handleOpenChange,
    handlePresetSelect,
    isOpen,
    selected,
    setActiveEnd,
    triggerRef,
  } = useDateRangePicker({ max, min, onValueChange, today, value })
  const hasValue = !!(value.from || value.to)
  const text = formatValue ? formatValue(value) : formatDayRange(value, locale)

  return (
    <div className={cn('relative min-w-0', className)}>
      <Popover
        ariaLabel={calendarLabel}
        // The calendar focuses its day itself (autoFocus)
        initialFocus={false}
        isOpen={isOpen}
        onOpenChange={handleOpenChange}
        trigger={
          <DatePickerTrigger
            ref={triggerRef}
            ariaLabel={ariaLabel}
            hasClearButton={hasValue && !!clearLabel}
            isActive={isActive}
            placeholder={placeholder}
            size={size}
            text={text}
          />
        }
      >
        <DateRangePanel
          activeEnd={activeEnd}
          bounds={bounds}
          calendarKey={calendarKey}
          clearLabel={clearLabel}
          doneLabel={doneLabel}
          fromLabel={fromLabel}
          locale={locale}
          onDaySelect={handleDaySelect}
          onDone={() => handleOpenChange(false)}
          onEndClear={handleEndClear}
          onEndSelect={setActiveEnd}
          onPresetSelect={handlePresetSelect}
          presets={presets}
          presetsLabel={presetsLabel}
          selected={selected}
          toLabel={toLabel}
          today={today}
          value={value}
        />
      </Popover>
      {hasValue && clearLabel && <DatePickerClearButton label={clearLabel} onClear={handleClear} />}
    </div>
  )
}

export default DateRangePicker
