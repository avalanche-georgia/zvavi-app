import { parseIsoDay, toIsoDay } from '@components/features/admin/shared'
import { useDatePickerText } from '@components/hooks'
import type { DateMode } from '@data/hooks/recentAvalanches'
import { DatePicker, SegmentedControl } from '@ds/primitives'
import { useTranslations } from 'next-intl'

import type { AvalanchesListPage } from '../hooks/useAvalanchesListPage'
import { dateModes } from '../model'

type DateFilterProps = {
  page: Pick<
    AvalanchesListPage,
    'dateFrom' | 'dateMode' | 'dateTo' | 'onDateFromChange' | 'onDateModeChange' | 'onDateToChange'
  >
}

// Which date to filter by (when it happened / when it was logged) and the range
const DateFilter = ({ page }: DateFilterProps) => {
  const t = useTranslations()
  const { calendarLabel, clearLabel, locale } = useDatePickerText()
  const { dateFrom, dateMode, dateTo } = page
  const today = toIsoDay(new Date()) ?? undefined

  const modeOptions = dateModes.map((mode: DateMode) => ({
    label: t(`admin.recentAvalanches.filters.dateMode.${mode}`),
    value: mode,
  }))

  const handleFromChange = (date: Date | null) => page.onDateFromChange(toIsoDay(date))
  const handleToChange = (date: Date | null) => page.onDateToChange(toIsoDay(date))

  return (
    <div className="flex max-w-full min-w-0 flex-wrap items-center gap-2">
      <SegmentedControl
        ariaLabel={t('admin.recentAvalanches.filters.dateMode.label')}
        className="max-w-full overflow-x-auto"
        onChange={page.onDateModeChange}
        options={modeOptions}
        value={dateMode}
      />
      <div className="flex items-center gap-2">
        <DatePicker
          ariaLabel={t('common.words.from')}
          calendarLabel={calendarLabel}
          className="w-44"
          clearLabel={clearLabel}
          locale={locale}
          max={dateTo ?? today}
          onValueChange={handleFromChange}
          placeholder={t('common.words.from')}
          value={parseIsoDay(dateFrom)}
        />
        <span aria-hidden className="text-muted">
          –
        </span>
        <DatePicker
          ariaLabel={t('common.words.to')}
          calendarLabel={calendarLabel}
          className="w-44"
          clearLabel={clearLabel}
          locale={locale}
          max={today}
          min={dateFrom ?? undefined}
          onValueChange={handleToChange}
          placeholder={t('common.words.to')}
          value={parseIsoDay(dateTo)}
        />
      </div>
    </div>
  )
}

export default DateFilter
