/* eslint-disable react/jsx-props-no-spreading */

'use client'

import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp } from 'lucide-react'
import { type ChevronProps, DayPicker, type Locale } from 'react-day-picker'

import { calendarClasses } from './calendarClasses'
import CalendarDayButton from './CalendarDayButton'
import CalendarNavButton from './CalendarNavButton'

import { cn } from '@/lib/utils'

// locale is required: left out, a Georgian page would get English month names
// and aria labels
export type CalendarProps = React.ComponentProps<typeof DayPicker> & { locale: Locale }

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
// "Today" is the browser's day: a page that counts days in Tbilisi time passes
// `today` too, so the highlight agrees with its data. Weeks start on Monday in
// every language (English's locale would start them on Sunday).
const Calendar = ({ classNames, components, weekStartsOn = 1, ...props }: CalendarProps) => (
  <DayPicker
    classNames={{ ...calendarClasses, ...classNames }}
    components={{
      Chevron: CalendarChevron,
      DayButton: CalendarDayButton,
      NextMonthButton: CalendarNavButton,
      PreviousMonthButton: CalendarNavButton,
      ...components,
    }}
    weekStartsOn={weekStartsOn}
    {...props}
  />
)

export default Calendar
