/* eslint-disable react/jsx-props-no-spreading */

'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { type ChevronProps, DayPicker } from 'react-day-picker'

import { calendarClasses } from './calendarClasses'
import CalendarDayButton from './CalendarDayButton'
import CalendarNavButton from './CalendarNavButton'

export type CalendarProps = React.ComponentProps<typeof DayPicker>

const CalendarChevron = ({ orientation }: ChevronProps) =>
  orientation === 'left' ? (
    <ChevronLeft aria-hidden className="size-4.5" />
  ) : (
    <ChevronRight aria-hidden className="size-4.5" />
  )

// A month grid on react-day-picker, styled with ds tokens. Every DayPicker prop
// passes through: `mode` + `selected` + `onSelect` for single or range picks,
// `startMonth` / `endMonth` / `disabled` to bound it. Pass `locale` from
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
