import { useDateRangePickerText } from '@components/hooks'
import type { DateMode } from '@data/hooks/recentAvalanches'
import { DateRangePicker, SegmentedControl } from '@ds/primitives'
import { useTranslations } from 'next-intl'

import type { AvalanchesListPage } from '../hooks/useAvalanchesListPage'
import { dateModes } from '../model'

import { getTbilisiTodayIso } from '@/lib/tbilisiTime'

type DateFilterProps = {
  page: Pick<
    AvalanchesListPage,
    'dateFrom' | 'dateMode' | 'dateTo' | 'onDateModeChange' | 'onDatesChange'
  >
}

// Which date to filter by (when it happened / when it was logged) and the range
const DateFilter = ({ page }: DateFilterProps) => {
  const t = useTranslations()
  const { calendarLabel, clearLabel, doneLabel, fromLabel, locale, toLabel } =
    useDateRangePickerText()
  const { dateFrom, dateMode, dateTo } = page

  const modeOptions = dateModes.map((mode: DateMode) => ({
    label: t(`admin.recentAvalanches.filters.dateMode.${mode}`),
    value: mode,
  }))

  return (
    <div className="flex max-w-full min-w-0 flex-wrap items-center gap-2">
      <SegmentedControl
        ariaLabel={t('admin.recentAvalanches.filters.dateMode.label')}
        className="max-w-full overflow-x-auto"
        onChange={page.onDateModeChange}
        options={modeOptions}
        value={dateMode}
      />
      <DateRangePicker
        ariaLabel={t('common.dateRangePicker.label')}
        calendarLabel={calendarLabel}
        className="w-64"
        clearLabel={clearLabel}
        doneLabel={doneLabel}
        fromLabel={fromLabel}
        isActive={!!(dateFrom || dateTo)}
        locale={locale}
        max={getTbilisiTodayIso()}
        onValueChange={page.onDatesChange}
        placeholder={t('common.dateRangePicker.anyDates')}
        toLabel={toLabel}
        value={{ from: dateFrom, to: dateTo }}
      />
    </div>
  )
}

export default DateFilter
