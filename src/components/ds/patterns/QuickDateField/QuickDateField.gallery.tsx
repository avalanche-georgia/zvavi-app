'use client'

import { useState } from 'react'
import { addDays, format, isSameDay, isToday, isYesterday, startOfDay } from 'date-fns'
import { enUS } from 'react-day-picker/locale'

import QuickDateField from './QuickDateField'

const today = startOfDay(new Date())
const isoDay = (date: Date) => format(date, 'yyyy-MM-dd')

const futureQuickDates = [
  { label: 'Tomorrow', value: '1' },
  { label: 'In 2 days', value: '2' },
  { label: 'In 3 days', value: '3' },
]

const pastQuickDates = [
  { label: 'Today', value: 'today' },
  { label: 'Yesterday', value: 'yesterday' },
  { label: 'Not sure', value: 'unknown' },
]

const QuickDateFieldGallery = () => {
  const [validUntil, setValidUntil] = useState<Date | null>(null)
  const [occurred, setOccurred] = useState<Date | null>(today)
  const [isUnknown, setIsUnknown] = useState(false)

  const futureSelected =
    futureQuickDates.find(
      ({ value }) => validUntil && isSameDay(validUntil, addDays(today, Number(value))),
    )?.value ?? null

  const handleFuturePick = (days: string) => {
    const date = addDays(today, Number(days))

    date.setHours(validUntil?.getHours() ?? 18, validUntil?.getMinutes() ?? 0)
    setValidUntil(date)
  }

  const pastSelected = isUnknown
    ? 'unknown'
    : occurred && isToday(occurred)
      ? 'today'
      : occurred && isYesterday(occurred)
        ? 'yesterday'
        : null

  const handlePastPick = (value: string) => {
    setIsUnknown(value === 'unknown')
    setOccurred(value === 'today' ? today : value === 'yesterday' ? addDays(today, -1) : null)
  }

  const handleOccurredChange = (date: Date | null) => {
    setIsUnknown(false)
    setOccurred(date)
  }

  return (
    <div className="flex max-w-md flex-col gap-6">
      <QuickDateField
        calendarLabel="Choose a date"
        label="Valid until (future, with time)"
        locale={enUS}
        min={isoDay(today)}
        onQuickDateChange={handleFuturePick}
        onValueChange={setValidUntil}
        placeholder="Select date"
        quickDates={futureQuickDates}
        quickDatesLabel="Quick dates"
        required
        selectedQuickDate={futureSelected}
        summary={validUntil ? format(validUntil, 'EEE, d MMM · HH:mm') : undefined}
        timeLabel="Time"
        value={validUntil}
        withTime
      />
      <QuickDateField
        calendarLabel="Choose a date"
        label="When (past, with Not sure)"
        locale={enUS}
        max={isoDay(today)}
        onQuickDateChange={handlePastPick}
        onValueChange={handleOccurredChange}
        placeholder={isUnknown ? 'Not sure' : 'Select date'}
        quickDates={pastQuickDates}
        quickDatesLabel="Quick dates"
        selectedQuickDate={pastSelected}
        summary={isUnknown ? 'Describe roughly when below.' : undefined}
        value={occurred}
      />
      <QuickDateField
        calendarLabel="Choose a date"
        error="Pick when this forecast expires."
        label="With error"
        locale={enUS}
        onQuickDateChange={() => undefined}
        onValueChange={() => undefined}
        placeholder="Select date"
        quickDates={futureQuickDates}
        quickDatesLabel="Quick dates"
        required
        selectedQuickDate={null}
        value={null}
      />
    </div>
  )
}

export default QuickDateFieldGallery
