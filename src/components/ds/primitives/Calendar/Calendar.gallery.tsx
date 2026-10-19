'use client'

import { useState } from 'react'
import type { DateRange } from 'react-day-picker'
import { enUS } from 'react-day-picker/locale'

import Calendar from './Calendar'

const today = new Date()
const seasonStart = new Date(today.getFullYear(), today.getMonth() - 1, 5)
const seasonEnd = new Date(today.getFullYear(), today.getMonth() + 1, 20)

const GalleryCell = ({ children, title }: { children: React.ReactNode; title: string }) => (
  <div className="flex flex-col gap-2">
    <span className="text-caption text-muted">{title}</span>
    <div className="rounded-card border-rule bg-surface w-fit border p-3">{children}</div>
  </div>
)

const CalendarGallery = () => {
  const [day, setDay] = useState<Date | undefined>(today)
  const [range, setRange] = useState<DateRange | undefined>()
  const [boundedRange, setBoundedRange] = useState<DateRange | undefined>()

  return (
    <div className="flex flex-wrap gap-6">
      <GalleryCell title="Single">
        <Calendar locale={enUS} mode="single" onSelect={setDay} selected={day} />
      </GalleryCell>
      <GalleryCell title="Range">
        <Calendar locale={enUS} mode="range" onSelect={setRange} selected={range} />
      </GalleryCell>
      <GalleryCell title="Range, bounded (prev month 5th → next month 20th)">
        <Calendar
          disabled={[{ before: seasonStart }, { after: seasonEnd }]}
          endMonth={seasonEnd}
          locale={enUS}
          mode="range"
          onSelect={setBoundedRange}
          selected={boundedRange}
          startMonth={seasonStart}
        />
      </GalleryCell>
    </div>
  )
}

export default CalendarGallery
