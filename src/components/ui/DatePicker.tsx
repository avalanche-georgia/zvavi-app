'use client'

import { useState } from 'react'
import { Button as HeadlessUIButton } from '@headlessui/react'
import clsx from 'clsx'
import { format } from 'date-fns'
import { Calendar as CalendarIcon, X } from 'lucide-react'

import { Calendar } from './Calendar'
import { Popover, PopoverContent, PopoverTrigger } from './Popover'

type DatePickerProps = {
  disabled?: boolean
  isClearable?: boolean
  maxDate?: Date
  minDate?: Date
  onChange: (date: Date | null) => void
  placeholder?: string
  value: Date | null
}

const DatePicker = ({
  disabled = false,
  isClearable = false,
  maxDate,
  minDate,
  onChange,
  placeholder = 'Select date',
  value,
}: DatePickerProps) => {
  const [open, setOpen] = useState(false)

  const handleSelect = (date: Date | undefined) => {
    onChange(date ?? null)
    setOpen(false)
  }

  const handleClear = () => {
    onChange(null)
  }

  const isClearButtonVisible = isClearable && value

  return (
    <Popover onOpenChange={setOpen} open={open}>
      <div className="relative flex">
        <PopoverTrigger asChild>
          <HeadlessUIButton
            className={clsx(
              'flex h-10 w-full items-center rounded-md border border-gray-300 bg-white',
              'px-3 py-2 text-sm ring-offset-white',
              'focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20',
              'disabled:cursor-not-allowed disabled:opacity-50',
              isClearButtonVisible && 'pr-9',
              !value && 'text-gray-500',
            )}
            disabled={disabled}
            type="button"
          >
            <span className="flex items-center gap-2">
              <CalendarIcon className="size-4" />
              {value ? format(value, 'dd MMM yyyy') : placeholder}
            </span>
          </HeadlessUIButton>
        </PopoverTrigger>
        {isClearButtonVisible && (
          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-0.5 hover:bg-gray-100"
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
      </PopoverContent>
    </Popover>
  )
}

export default DatePicker
