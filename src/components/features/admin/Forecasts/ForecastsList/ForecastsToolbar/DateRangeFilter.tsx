import { parseIsoDay, toIsoDay } from '@components/features/admin/shared'
import { getSeasonLabel } from '@domain/season'
import { DateField, SegmentedControl } from '@ds/primitives'
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
          <DateField
            ariaLabel={t('admin.forecasts.filters.range.from')}
            className="w-37.5"
            onValueChange={handleFromChange}
            value={parseIsoDay(dateFrom)}
          />
          <span aria-hidden className="text-muted">
            –
          </span>
          <DateField
            ariaLabel={t('admin.forecasts.filters.range.to')}
            className="w-37.5"
            min={dateFrom ?? undefined}
            onValueChange={handleToChange}
            value={parseIsoDay(dateTo)}
          />
        </div>
      )}
    </div>
  )
}

export default DateRangeFilter
