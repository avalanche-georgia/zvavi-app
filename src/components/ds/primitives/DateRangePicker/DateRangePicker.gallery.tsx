'use client'

import { useState } from 'react'
import { endOfMonth, format, startOfMonth, subDays, subMonths } from 'date-fns'
import { enUS, ka } from 'react-day-picker/locale'

import DateRangePicker from './DateRangePicker'
import type { DayRange } from './dayRange'
import { Field } from '../Field'

const today = new Date()
const isoDay = (date: Date) => format(date, 'yyyy-MM-dd')
const lastMonth = subMonths(today, 1)

// Shared demo copy; callers pass translated strings
const strings = {
  calendarLabel: 'Choose dates',
  clearLabel: 'Clear dates',
  doneLabel: 'Done',
  fromLabel: 'From',
  toLabel: 'To',
}

const presets = [
  { label: 'Last 7 days', range: { from: isoDay(subDays(today, 6)), to: isoDay(today) } },
  { label: 'Last 30 days', range: { from: isoDay(subDays(today, 29)), to: isoDay(today) } },
  {
    label: format(lastMonth, 'MMMM'),
    range: { from: isoDay(startOfMonth(lastMonth)), to: isoDay(endOfMonth(lastMonth)) },
  },
]

const DateRangePickerGallery = () => {
  const [range, setRange] = useState<DayRange>({ from: null, to: null })
  const [filter, setFilter] = useState<DayRange>(presets[1].range)
  const [kaRange, setKaRange] = useState<DayRange>({ from: isoDay(subDays(today, 3)), to: null })

  return (
    <div className="flex max-w-md flex-col gap-4">
      <Field description="Empty; From / To ends, Done" label="Dates">
        <DateRangePicker
          calendarLabel={strings.calendarLabel}
          doneLabel={strings.doneLabel}
          fromLabel={strings.fromLabel}
          locale={enUS}
          onValueChange={setRange}
          placeholder="Any dates"
          toLabel={strings.toLabel}
          value={range}
        />
      </Field>
      <div className="flex items-center gap-2">
        <DateRangePicker
          ariaLabel="Period"
          calendarLabel={strings.calendarLabel}
          className="w-60"
          clearLabel={strings.clearLabel}
          doneLabel={strings.doneLabel}
          fromLabel={strings.fromLabel}
          isActive={!!(filter.from || filter.to)}
          locale={enUS}
          max={isoDay(today)}
          onValueChange={setFilter}
          placeholder="Any dates"
          presets={presets}
          presetsLabel="Quick ranges"
          size="sm"
          toLabel={strings.toLabel}
          value={filter}
        />
        <span className="text-caption text-muted">
          sm filter: quick ranges, clear, active, past only
        </span>
      </div>
      <Field description="Georgian, start only" label="Georgian locale">
        <DateRangePicker
          calendarLabel="აირჩიეთ თარიღები"
          clearLabel="გასუფთავება"
          doneLabel="მზადაა"
          fromLabel="დან"
          locale={ka}
          onValueChange={setKaRange}
          toLabel="მდე"
          value={kaRange}
        />
      </Field>
    </div>
  )
}

export default DateRangePickerGallery
