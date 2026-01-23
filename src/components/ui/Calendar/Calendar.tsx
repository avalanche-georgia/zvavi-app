'use client'

/* eslint-disable react/jsx-props-no-spreading */

import clsx from 'clsx'
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'
import type { ComponentProps } from 'react'
import type { DropdownProps } from 'react-day-picker'
import { DayPicker } from 'react-day-picker'

type CalendarProps = ComponentProps<typeof DayPicker>

const navButtonStyles = clsx(
  'inline-flex size-7 items-center justify-center rounded-md border border-gray-200',
  'bg-white hover:bg-gray-100 disabled:pointer-events-none disabled:opacity-50',
)

const dropdownStyles = clsx(
  'h-8 cursor-pointer appearance-none rounded-md border border-gray-200 bg-white',
  'px-3 pr-7 text-sm font-medium',
  'focus:outline-none focus:ring-2 focus:ring-blue-500',
)

const dayButtonStyles = clsx(
  'inline-flex size-9 items-center justify-center rounded-md p-0 text-sm font-normal',
  'hover:bg-gray-100 hover:text-gray-900',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500',
)

const currentYear = new Date().getFullYear()
const startYear = currentYear - 50
const endYear = currentYear + 20

const ChevronIcon = ({ orientation }: { orientation?: 'left' | 'right' | 'up' | 'down' }) =>
  orientation === 'left' ? <ChevronLeft className="size-4" /> : <ChevronRight className="size-4" />

const Dropdown = ({ 'aria-label': ariaLabel, onChange, options, value }: DropdownProps) => (
  <div className="relative inline-block">
    <select aria-label={ariaLabel} className={dropdownStyles} onChange={onChange} value={value}>
      {options?.map((option) => (
        <option key={option.value} disabled={option.disabled} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    <ChevronDown className="pointer-events-none absolute right-2 top-1/2 size-3 -translate-y-1/2 text-gray-500" />
  </div>
)

const Calendar = ({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) => (
  <DayPicker
    captionLayout="dropdown"
    className={clsx('p-3', className)}
    classNames={{
      button_next: clsx(navButtonStyles, 'absolute right-4 top-8 z-10'),
      button_previous: clsx(navButtonStyles, 'absolute left-4 top-8 z-10'),
      caption_label: 'hidden',
      day: 'size-9 p-0 text-center text-sm',
      day_button: dayButtonStyles,
      disabled: 'text-gray-400 opacity-50',
      dropdowns: 'flex items-center justify-center gap-2',
      hidden: 'invisible',
      month: 'relative space-y-4',
      month_caption: 'flex items-center justify-center h-8 mb-4',
      month_grid: 'w-full border-collapse',
      months: '',
      nav: 'contents',
      outside: 'text-gray-400 opacity-50',
      range_end: 'rounded-r-md',
      range_middle: 'aria-selected:bg-gray-100 aria-selected:text-gray-900',
      range_start: 'rounded-l-md',
      selected: '[&>button]:bg-primary [&>button]:text-white [&>button]:hover:bg-primary',
      today: '[&>button]:bg-gray-100 [&>button]:font-semibold',
      week: 'mt-2 flex w-full',
      weekday: 'size-9 text-xs font-normal text-gray-500',
      weekdays: 'flex',
      ...classNames,
    }}
    components={{ Chevron: ChevronIcon, Dropdown }}
    endMonth={new Date(endYear, 11)}
    showOutsideDays={showOutsideDays}
    startMonth={new Date(startYear, 0)}
    {...props}
  />
)

Calendar.displayName = 'Calendar'

export default Calendar
