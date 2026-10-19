'use client'

import { useState } from 'react'
import { Button, Calendar } from '@ds/primitives'
import { format, parseISO } from 'date-fns'
import { useLocale, useTranslations } from 'next-intl'
import type { DateRange as DayPickerRange } from 'react-day-picker'

import MonthPresets from './MonthPresets'
import { type ArchiveSeason, getSeasonBounds, toggleMonthRange } from '../model'

import { getDayPickerLocale } from '@/lib/dayPickerLocale'

type DateRange = { from: string | null; to: string | null }

type DateRangePanelProps = DateRange & {
  activeMonths: string[]
  onClose: VoidFunction
  onRangeChange: (range: DateRange) => void
  season: ArchiveSeason
}

const toDay = (date: Date | undefined) => (date ? format(date, 'yyyy-MM-dd') : null)

// Month presets over a range calendar, bounded to the season's forecasts
const DateRangePanel = ({
  activeMonths,
  from,
  onClose,
  onRangeChange,
  season,
  to,
}: DateRangePanelProps) => {
  const t = useTranslations()
  const locale = useLocale()
  const bounds = getSeasonBounds(season)
  const firstDay = parseISO(bounds.firstDay)
  const lastDay = parseISO(bounds.lastDay)
  const [month, setMonth] = useState(from ? parseISO(from) : lastDay)

  const selected: DayPickerRange | undefined = from
    ? { from: parseISO(from), to: to ? parseISO(to) : undefined }
    : undefined

  const handleSelect = (range: DayPickerRange | undefined) =>
    onRangeChange({ from: toDay(range?.from), to: toDay(range?.to) })

  const handleMonthSelect = (monthId: string) => {
    const range = toggleMonthRange(from, to, monthId)

    onRangeChange(range)
    if (range.from) setMonth(parseISO(range.from))
  }

  return (
    <div className="flex w-80 max-w-full flex-col gap-3">
      {activeMonths.length > 0 && (
        <MonthPresets
          activeMonths={activeMonths}
          from={from}
          onMonthSelect={handleMonthSelect}
          to={to}
        />
      )}
      <Calendar
        captionLayout="dropdown-years"
        className="mx-auto"
        disabled={[{ before: firstDay }, { after: lastDay }]}
        endMonth={lastDay}
        locale={getDayPickerLocale(locale)}
        mode="range"
        month={month}
        onMonthChange={setMonth}
        onSelect={handleSelect}
        selected={selected}
        startMonth={firstDay}
      />
      <div className="border-rule flex justify-end gap-2 border-t pt-3">
        <Button
          onClick={() => onRangeChange({ from: null, to: null })}
          size="sm"
          variant="secondary"
        >
          {t('forecast.history.filters.reset')}
        </Button>
        <Button onClick={onClose} size="sm" variant="primary">
          {t('forecast.history.filters.done')}
        </Button>
      </div>
    </div>
  )
}

export default DateRangePanel
