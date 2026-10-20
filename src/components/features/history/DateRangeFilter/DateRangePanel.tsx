'use client'

import { useState } from 'react'
import { Button, Calendar } from '@ds/primitives'
import { format, parseISO } from 'date-fns'
import { useLocale, useTranslations } from 'next-intl'
import type { DateRange as DayPickerRange } from 'react-day-picker'

import MonthPresets from './MonthPresets'
import {
  type ArchiveDateRange,
  type ArchiveSeason,
  emptyDateRange,
  getSeasonBounds,
  toggleMonthRange,
  toTbilisiDay,
} from '../model'

import { getDayPickerLocale } from '@/lib/dayPickerLocale'

type DateRangePanelProps = ArchiveDateRange & {
  activeMonths: string[]
  onPanelClose: VoidFunction
  onRangeChange: (range: ArchiveDateRange) => void
  ref?: React.Ref<HTMLDivElement>
  season: ArchiveSeason
}

const toDay = (date: Date | undefined) => (date ? format(date, 'yyyy-MM-dd') : null)

// Month presets over a range calendar, bounded to the season's forecasts
const DateRangePanel = ({
  activeMonths,
  from,
  onPanelClose,
  onRangeChange,
  ref,
  season,
  to,
}: DateRangePanelProps) => {
  const t = useTranslations()
  const locale = useLocale()
  const bounds = getSeasonBounds(season)
  const firstDay = parseISO(bounds.firstDay)
  const lastDay = parseISO(bounds.lastDay)
  const [month, setMonth] = useState(from ? parseISO(from) : lastDay)
  // A started range shows open here but filters as one day until its end is picked
  const [pendingFrom, setPendingFrom] = useState<string | null>(null)

  const selected: DayPickerRange | undefined = pendingFrom
    ? { from: parseISO(pendingFrom), to: undefined }
    : from
      ? { from: parseISO(from), to: to ? parseISO(to) : undefined }
      : undefined

  const handleSelect = (range: DayPickerRange | undefined) => {
    const start = toDay(range?.from)
    const end = toDay(range?.to)

    setPendingFrom(end ? null : start)
    onRangeChange({ from: start, to: end ?? start })
  }

  const handleMonthSelect = (monthId: string) => {
    const range = toggleMonthRange(from, to, monthId)

    setPendingFrom(null)
    onRangeChange(range)
    if (range.from) setMonth(parseISO(range.from))
  }

  const handleReset = () => {
    setPendingFrom(null)
    onRangeChange(emptyDateRange)
  }

  return (
    <div ref={ref} className="flex w-80 max-w-full flex-col gap-3">
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
        resetOnSelect
        selected={selected}
        startMonth={firstDay}
        // Georgian "today", like the rest of the archive
        today={parseISO(toTbilisiDay(new Date()))}
      />
      <div className="border-rule flex justify-end gap-2 border-t pt-3">
        <Button onClick={handleReset} size="sm" variant="secondary">
          {t('forecast.history.filters.reset')}
        </Button>
        <Button onClick={onPanelClose} size="sm" variant="primary">
          {t('forecast.history.filters.done')}
        </Button>
      </div>
    </div>
  )
}

export default DateRangePanel
