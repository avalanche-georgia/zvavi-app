import { serverDateFormat } from '@domain/constants'
import { getSeasonLabel } from '@domain/season'
import { DateField, SegmentedControl } from '@ds/primitives'
import { format } from 'date-fns'
import { useTranslations } from 'next-intl'

import type { ForecastsListState } from '../hooks'
import { type DateRange, dateRanges, parseDay } from '../model'

type DateRangeFilterProps = {
  list: Pick<
    ForecastsListState,
    'dateFrom' | 'dateTo' | 'onDateFromChange' | 'onDateToChange' | 'onRangeChange' | 'range'
  >
  now: Date
}

const toIsoDay = (date: Date | null) => (date ? format(date, serverDateFormat) : null)

// Filters by the created date
const DateRangeFilter = ({ list, now }: DateRangeFilterProps) => {
  const t = useTranslations()
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
    <div className="flex flex-wrap items-center gap-2">
      <SegmentedControl
        ariaLabel={t('admin.forecasts.filters.range.label')}
        onChange={list.onRangeChange}
        options={options}
        value={range}
      />
      {range === 'custom' && (
        <div className="flex items-center gap-2">
          <DateField
            ariaLabel={t('admin.forecasts.filters.range.from')}
            className="w-37.5"
            onValueChange={handleFromChange}
            value={parseDay(dateFrom)}
          />
          <span aria-hidden className="text-muted">
            –
          </span>
          <DateField
            ariaLabel={t('admin.forecasts.filters.range.to')}
            className="w-37.5"
            min={dateFrom ?? undefined}
            onValueChange={handleToChange}
            value={parseDay(dateTo)}
          />
        </div>
      )}
    </div>
  )
}

export default DateRangeFilter
