'use client'

import { dateFormat, dateTimeFormat } from '@domain/constants'
import { Button as HeadlessUIButton } from '@headlessui/react'
import clsx from 'clsx'
import { format } from 'date-fns'
import { Calendar as CalendarIcon, X } from 'lucide-react'
import { twMerge } from 'tailwind-merge'

import { Calendar } from './Calendar'
import DatePickerTimeInput from './DatePickerTimeInput'
import { Popover, PopoverContent, PopoverTrigger } from './Popover'
import useDatePicker from './useDatePicker'

type DatePickerProps = {
  className?: string
  disabled?: boolean
  isClearable?: boolean
  maxDate?: Date
  minDate?: Date
  onChange: (date: Date | null) => void
  placeholder?: string
  showTime?: boolean
  value: Date | null
}

const DatePicker = ({
  className,
  disabled = false,
  isClearable = false,
  maxDate,
  minDate,
  onChange,
  placeholder = 'Select date',
  showTime = false,
  value,
}: DatePickerProps) => {
  const { handleClear, handleSelect, open, setOpen } = useDatePicker({ onChange, showTime, value })

  const isClearButtonVisible = isClearable && value

  return (
    <Popover onOpenChange={setOpen} open={open}>
      <div className="relative flex">
        <PopoverTrigger asChild>
          <HeadlessUIButton
            className={twMerge(
              clsx(
                'flex h-10 w-full items-center rounded-md border border-gray-300 bg-white',
                className,
                'px-3 py-2 text-sm ring-offset-white',
                'focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-hidden',
                'disabled:cursor-not-allowed disabled:opacity-50',
                isClearButtonVisible && 'pr-9',
                !value && 'text-gray-500',
              ),
            )}
            disabled={disabled}
            type="button"
          >
            <span className="flex items-center gap-2">
              <CalendarIcon className="size-4" />
              {value ? format(value, showTime ? dateTimeFormat : dateFormat) : placeholder}
            </span>
          </HeadlessUIButton>
        </PopoverTrigger>
        {isClearButtonVisible && (
          <button
            className="absolute top-1/2 right-2 -translate-y-1/2 rounded-sm p-0.5 hover:bg-gray-100"
            onClick={handleClear}
            type="button"
          >
            <X className="size-4 text-gray-500" />
          </button>
        )}
      </div>
      <PopoverContent align="start" className="w-auto p-0">
        <Calendar
          defaultMonth={value ?? undefined}
          disabled={(date) =>
            (maxDate != null && date > maxDate) || (minDate != null && date < minDate)
          }
          mode="single"
          onSelect={handleSelect}
          selected={value ?? undefined}
        />
        {showTime && <DatePickerTimeInput onChange={onChange} value={value} />}
      </PopoverContent>
    </Popover>
  )
}

export default DatePicker
