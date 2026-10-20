import { parseIsoDay, toIsoDay } from '@components/features/admin/shared'
import { useDatePickerText } from '@components/hooks'
import { getSeasonLabel } from '@domain/season'
import { DatePicker, SegmentedControl } from '@ds/primitives'
import { useTranslations } from 'next-intl'

import type { ForecastsListState } from '../hooks'
import { type DateRange, dateRanges } from '../model'

type DateRangeFilterProps = {
  list: Pick<
    ForecastsListState,
    'dateFrom' | 'dateTo' | 'onDateFromChange' | 'onDateToChange' | 'onRangeChange' | 'range'
  >
  now: Date
}

// Filters by the created date
const DateRangeFilter = ({ list, now }: DateRangeFilterProps) => {
  const t = useTranslations()
  const { calendarLabel, clearLabel, locale } = useDatePickerText()
  const { dateFrom, dateTo, range } = list

  const options = dateRanges.map((value: DateRange) => ({
    label:
      value === 'season'
        ? t('admin.forecasts.filters.range.season', { season: getSeasonLabel(now) })
        : t(`admin.forecasts.filters.range.${value}`),
    value,
  }))

  const handleFromChange = (date: Date | null) => list.onDateFromChange(toIsoDay(date))
  const handleToChange = (date: Date | null) => list.onDateToChange(toIsoDay(date))

  return (
    <div className="flex max-w-full min-w-0 flex-wrap items-center gap-2">
      <SegmentedControl
        ariaLabel={t('admin.forecasts.filters.range.label')}
        className="max-w-full overflow-x-auto"
        onChange={list.onRangeChange}
        options={options}
        value={range}
      />
      {range === 'custom' && (
        <div className="flex items-center gap-2">
          <DatePicker
            ariaLabel={t('admin.forecasts.filters.range.from')}
            calendarLabel={calendarLabel}
            className="w-44"
            clearLabel={clearLabel}
            locale={locale}
            max={dateTo ?? undefined}
            onValueChange={handleFromChange}
            placeholder={t('admin.forecasts.filters.range.from')}
            value={parseIsoDay(dateFrom)}
          />
          <span aria-hidden className="text-muted">
            –
          </span>
          <DatePicker
            ariaLabel={t('admin.forecasts.filters.range.to')}
            calendarLabel={calendarLabel}
            className="w-44"
            clearLabel={clearLabel}
            locale={locale}
            min={dateFrom ?? undefined}
            onValueChange={handleToChange}
            placeholder={t('admin.forecasts.filters.range.to')}
            value={parseIsoDay(dateTo)}
          />
        </div>
      )}
    </div>
  )
}

export default DateRangeFilter
