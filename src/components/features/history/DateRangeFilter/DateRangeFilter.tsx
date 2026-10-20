'use client'

import { useDateRangePickerText } from '@components/hooks'
import { DateRangePicker } from '@ds/primitives'
import { useTranslations } from 'next-intl'

import useDateFilterFormat from './useDateFilterFormat'
import useArchiveFormat from '../hooks/useArchiveFormat'
import { type ArchiveDateRange, type ArchiveSeason, getMonthRange, getSeasonBounds } from '../model'

type DateRangeFilterProps = ArchiveDateRange & {
  activeMonths: string[]
  onRangeChange: (range: ArchiveDateRange) => void
  season: ArchiveSeason
}

// The season's dates: the months with forecasts as quick ranges, then any range
// within the season. Days count in Georgia (the picker's default), like the rest of the archive.
const DateRangeFilter = ({
  activeMonths,
  from,
  onRangeChange,
  season,
  to,
}: DateRangeFilterProps) => {
  const t = useTranslations()
  const { calendarLabel, doneLabel, fromLabel, locale, toLabel } = useDateRangePickerText()
  const { formatMonthShort } = useArchiveFormat()
  const formatValue = useDateFilterFormat()
  const { firstDay, lastDay } = getSeasonBounds(season)

  const presets = activeMonths.map((monthId) => ({
    label: formatMonthShort(monthId),
    range: getMonthRange(monthId),
  }))

  return (
    <DateRangePicker
      ariaLabel={t('forecast.history.filters.dateRange')}
      calendarLabel={calendarLabel}
      clearLabel={t('forecast.history.filters.clearDates')}
      doneLabel={doneLabel}
      formatValue={formatValue}
      fromLabel={fromLabel}
      isActive={from !== null || to !== null}
      locale={locale}
      max={lastDay}
      min={firstDay}
      onValueChange={onRangeChange}
      placeholder={t('forecast.history.filters.dates')}
      presets={presets}
      presetsLabel={t('forecast.history.filters.months')}
      size="sm"
      toLabel={toLabel}
      value={{ from, to }}
    />
  )
}

export default DateRangeFilter
