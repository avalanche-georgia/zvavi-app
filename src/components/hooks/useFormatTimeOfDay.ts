'use client'

import { useFormatter } from 'next-intl'

type TimedRecord = { date: Date | string | null; isTimeKnown: boolean }

// Times of day, 24-hour, in Tbilisi time (next-intl's time zone):
// - formatTime: "14:30"
// - withTime: a record's date label plus its time when it has one, "15 Oct · 14:30"
const useFormatTimeOfDay = () => {
  const formatter = useFormatter()

  const formatTime = (date: Date | string) =>
    formatter.dateTime(new Date(date), { hour: '2-digit', hourCycle: 'h23', minute: '2-digit' })

  const withTime = (label: string, { date, isTimeKnown }: TimedRecord) =>
    isTimeKnown && date ? `${label} · ${formatTime(date)}` : label

  return { formatTime, withTime }
}

export default useFormatTimeOfDay
