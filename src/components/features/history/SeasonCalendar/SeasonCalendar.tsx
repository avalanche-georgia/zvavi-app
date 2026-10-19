'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'

import CalendarCaption from './CalendarCaption'
import CalendarMonthRow from './CalendarMonthRow'
import { type ArchiveFilters, type ArchiveForecast, toggleMonthRange, toTbilisiDay } from '../model'

type SeasonCalendarProps = {
  activeMonths: string[]
  dayMap: Map<string, ArchiveForecast>
  filters: ArchiveFilters
  onDaySelect: (forecast: ArchiveForecast) => void
  onFiltersChange: (changes: Partial<ArchiveFilters>) => void
}

const ticks = [1, 10, 20, 31]

// One row per month, one cell per day coloured by the overall danger. Hidden on
// phones, where 31 cells per row get too small to tap.
const SeasonCalendar = ({
  activeMonths,
  dayMap,
  filters,
  onDaySelect,
  onFiltersChange,
}: SeasonCalendarProps) => {
  const t = useTranslations()
  const [hoveredDay, setHoveredDay] = useState<string | null>(null)
  const today = toTbilisiDay(new Date())

  const handleMonthToggle = (monthId: string) =>
    onFiltersChange(toggleMonthRange(filters.from, filters.to, monthId))

  return (
    <section className="rounded-card border-rule bg-surface mt-5 hidden border px-3.5 pt-4.5 pb-3.5 sm:block md:px-5">
      <header className="mb-3 flex items-baseline justify-between gap-3">
        <h2 className="text-copy-lg font-semibold">{t('forecast.history.glance.title')}</h2>
        <span className="text-copy-sm text-muted">
          {t('forecast.history.glance.daysCovered', { count: dayMap.size })}
        </span>
      </header>
      <div className="grid grid-cols-[2.5rem_repeat(31,minmax(0,1fr))] gap-0.75">
        <span />
        {Array.from({ length: 31 }, (_, index) => (
          <span key={index} aria-hidden className="text-micro text-placeholder">
            {ticks.includes(index + 1) && index + 1}
          </span>
        ))}
        {activeMonths.map((monthId) => (
          <CalendarMonthRow
            key={monthId}
            dayMap={dayMap}
            filters={filters}
            monthId={monthId}
            onDayHover={setHoveredDay}
            onDaySelect={onDaySelect}
            onMonthToggle={handleMonthToggle}
            today={today}
          />
        ))}
      </div>
      <CalendarCaption
        day={hoveredDay}
        forecast={hoveredDay ? dayMap.get(hoveredDay) : undefined}
      />
    </section>
  )
}

export default SeasonCalendar
