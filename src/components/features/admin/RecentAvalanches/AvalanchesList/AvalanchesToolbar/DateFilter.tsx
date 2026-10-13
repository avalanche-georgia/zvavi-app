import { parseIsoDay, toIsoDay } from '@components/features/admin/shared'
import type { DateMode } from '@data/hooks/recentAvalanches'
import { DateField, SegmentedControl } from '@ds/primitives'
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
        <DateField
          ariaLabel={t('common.words.from')}
          className="w-37.5"
          max={dateTo ?? today}
          onValueChange={handleFromChange}
          value={parseIsoDay(dateFrom)}
        />
        <span aria-hidden className="text-muted">
          –
        </span>
        <DateField
          ariaLabel={t('common.words.to')}
          className="w-37.5"
          max={today}
          min={dateFrom ?? undefined}
          onValueChange={handleToChange}
          value={parseIsoDay(dateTo)}
        />
      </div>
    </div>
  )
}

export default DateFilter
