import { useDateRangePickerText } from '@components/hooks'
import { getSeasonLabel } from '@domain/season'
import { DateRangePicker, SegmentedControl } from '@ds/primitives'
import { useTranslations } from 'next-intl'

import type { ForecastsListState } from '../hooks'
import { type DateRange, dateRanges } from '../model'

type DateRangeFilterProps = {
  list: Pick<
    ForecastsListState,
    'dateFrom' | 'dateTo' | 'onDatesChange' | 'onRangeChange' | 'range'
  >
  now: Date
}

// Filters by the created date: a quick range, or Custom with a range picker
const DateRangeFilter = ({ list, now }: DateRangeFilterProps) => {
  const t = useTranslations()
  const { calendarLabel, clearLabel, doneLabel, fromLabel, locale, toLabel } =
    useDateRangePickerText()
  const { dateFrom, dateTo, range } = list

  const options = dateRanges.map((value: DateRange) => ({
    label:
      value === 'season'
        ? t('admin.forecasts.filters.range.season', { season: getSeasonLabel(now) })
        : t(`admin.forecasts.filters.range.${value}`),
    value,
  }))

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
        <DateRangePicker
          ariaLabel={t('admin.forecasts.filters.range.dates')}
          calendarLabel={calendarLabel}
          className="w-64"
          clearLabel={clearLabel}
          doneLabel={doneLabel}
          fromLabel={fromLabel}
          isActive={!!(dateFrom || dateTo)}
          locale={locale}
          onValueChange={list.onDatesChange}
          placeholder={t('common.dateRangePicker.anyDates')}
          toLabel={toLabel}
          value={{ from: dateFrom, to: dateTo }}
        />
      )}
    </div>
  )
}

export default DateRangeFilter
