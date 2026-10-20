'use client'

import { addDays, addMonths, startOfMonth, subDays, subYears } from 'date-fns'
import { enUS, ka } from 'react-day-picker/locale'

import Calendar, { type CalendarProps } from './Calendar'

const today = new Date()
const monthStart = startOfMonth(today)
const boundStart = addDays(startOfMonth(addMonths(today, -1)), 4)
const boundEnd = addDays(startOfMonth(addMonths(today, 1)), 19)

// Without onSelect, react-day-picker keeps the pick itself: `selected` is the
// starting value and every demo stays clickable
const demos: { props: CalendarProps; title: string }[] = [
  { props: { locale: enUS, mode: 'single', selected: today }, title: 'Single (today picked)' },
  {
    props: {
      locale: enUS,
      mode: 'range',
      selected: { from: subDays(today, 3), to: addDays(today, 3) },
    },
    title: 'Range',
  },
  {
    props: {
      disabled: [{ before: boundStart }, { after: boundEnd }],
      endMonth: boundEnd,
      locale: enUS,
      mode: 'range',
      startMonth: boundStart,
    },
    title: 'Range, bounded: disabled days, nav stops at the ends',
  },
  {
    props: {
      locale: enUS,
      mode: 'multiple',
      selected: [subDays(today, 2), today, addDays(today, 3)],
    },
    title: 'Multiple',
  },
  {
    props: {
      disabled: { after: addDays(monthStart, 2) },
      locale: enUS,
      mode: 'single',
      selected: addDays(monthStart, 5),
    },
    title: 'Selected day outside the allowed dates',
  },
  {
    props: {
      captionLayout: 'dropdown',
      endMonth: addMonths(today, 12),
      locale: enUS,
      mode: 'single',
      startMonth: subYears(today, 20),
    },
    title: 'Month + year selects (captionLayout dropdown)',
  },
  {
    props: {
      captionLayout: 'dropdown-years',
      endMonth: today,
      locale: enUS,
      mode: 'single',
      startMonth: subYears(today, 2),
    },
    title: 'Year select only (dropdown-years)',
  },
  {
    props: { locale: enUS, mode: 'single', showOutsideDays: true, showWeekNumber: true },
    title: 'Outside days + week numbers',
  },
  { props: { locale: ka, mode: 'single', selected: today }, title: 'Georgian locale' },
  {
    props: { locale: enUS, mode: 'range', numberOfMonths: 2 },
    title: 'Two months (side by side ≥640px)',
  },
]

const CalendarGallery = () => (
  <div className="flex flex-wrap gap-6">
    {demos.map(({ props, title }) => (
      <div key={title} className="flex flex-col gap-2">
        <span className="text-caption text-muted">{title}</span>
        <div className="rounded-card border-rule bg-surface w-fit border p-3">
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <Calendar {...props} />
        </div>
      </div>
    ))}
  </div>
)

export default CalendarGallery
