'use client'

import { useState } from 'react'
import { addDays, format } from 'date-fns'
import { enUS, ka } from 'react-day-picker/locale'

import DatePicker from './DatePicker'
import { Field } from '../Field'

const isoDay = (date: Date) => format(date, 'yyyy-MM-dd')
const today = new Date()

// Shared demo copy; callers pass translated strings
const strings = {
  calendarLabel: 'Choose a date',
  clearLabel: 'Clear date',
  placeholder: 'Select date',
  todayLabel: 'Today',
}

const DatePickerGallery = () => {
  const [date, setDate] = useState<Date | null>(null)
  const [dateTime, setDateTime] = useState<Date | null>(null)
  const [from, setFrom] = useState<Date | null>(addDays(today, -7))
  const [kaDate, setKaDate] = useState<Date | null>(today)

  return (
    <div className="flex max-w-md flex-col gap-4">
      <Field description="Clearable, with a Today shortcut" label="Date">
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <DatePicker {...strings} locale={enUS} onValueChange={setDate} value={date} />
      </Field>
      <Field
        description="With time; a new date starts at 18:00; future only"
        label="Valid until"
        required
      >
        <DatePicker
          calendarLabel={strings.calendarLabel}
          locale={enUS}
          min={isoDay(today)}
          onValueChange={setDateTime}
          placeholder={strings.placeholder}
          timeLabel="Time"
          value={dateTime}
          withTime
        />
      </Field>
      <div className="flex items-center gap-2">
        <DatePicker
          ariaLabel="From"
          calendarLabel={strings.calendarLabel}
          className="w-48"
          clearLabel={strings.clearLabel}
          locale={enUS}
          max={isoDay(today)}
          onValueChange={setFrom}
          placeholder="Any date"
          size="sm"
          value={from}
        />
        <span className="text-caption text-muted">sm, no Field label, clearable, past only</span>
      </div>
      <Field label="Georgian locale">
        <DatePicker
          calendarLabel="აირჩიეთ თარიღი"
          locale={ka}
          onValueChange={setKaDate}
          value={kaDate}
        />
      </Field>
      <Field label="Disabled">
        <DatePicker
          calendarLabel={strings.calendarLabel}
          disabled
          locale={enUS}
          onValueChange={() => undefined}
          value={today}
        />
      </Field>
      <Field error="Pick when this forecast expires." label="With error">
        <DatePicker
          calendarLabel={strings.calendarLabel}
          locale={enUS}
          onValueChange={() => undefined}
          placeholder={strings.placeholder}
          timeLabel="Time"
          value={null}
          withTime
        />
      </Field>
    </div>
  )
}

export default DatePickerGallery
