/* eslint-disable react/jsx-props-no-spreading */

'use client'

import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp } from 'lucide-react'
import { type ChevronProps, DayPicker } from 'react-day-picker'

import { calendarClasses } from './calendarClasses'
import CalendarDayButton from './CalendarDayButton'
import CalendarNavButton from './CalendarNavButton'

import { cn } from '@/lib/utils'

export type CalendarProps = React.ComponentProps<typeof DayPicker>

const chevrons = { down: ChevronDown, left: ChevronLeft, right: ChevronRight, up: ChevronUp }

// Month navigation arrows, and the caret of a dropdown caption
const CalendarChevron = ({ className, orientation = 'right' }: ChevronProps) => {
  const Chevron = chevrons[orientation]

  return (
    <Chevron
      aria-hidden
      className={cn(orientation === 'down' ? 'size-4' : 'size-4.5', className)}
    />
  )
}

// A month grid on react-day-picker, styled with ds tokens. Every DayPicker prop
// passes through: `mode` + `selected` + `onSelect` for single or range picks,
// `startMonth` / `endMonth` / `disabled` to bound it, `captionLayout="dropdown-years"`
// (or "dropdown") for a year (and month) select. Pass `locale` from
// `react-day-picker/locale` — it also carries the translated aria labels.
const Calendar = ({ classNames, components, ...props }: CalendarProps) => (
  <DayPicker
    classNames={{ ...calendarClasses, ...classNames }}
    components={{
      Chevron: CalendarChevron,
      DayButton: CalendarDayButton,
      NextMonthButton: CalendarNavButton,
      PreviousMonthButton: CalendarNavButton,
      ...components,
    }}
    {...props}
  />
)

export default Calendar
