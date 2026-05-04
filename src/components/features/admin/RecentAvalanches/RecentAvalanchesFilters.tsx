'use client'

import { Button, DatePicker, RadioGroup } from '@components/ui'
import type { DateMode } from '@data/hooks/recentAvalanches'
import { useTranslations } from 'next-intl'

type RecentAvalanchesFiltersProps = {
  dateFrom: Date | null
  dateMode: DateMode
  dateTo: Date | null
  onDateFromChange: (date: Date | null) => void
  onDateModeChange: (mode: DateMode) => void
  onDateToChange: (date: Date | null) => void
  onReset: VoidFunction
}

const today = new Date()

const RecentAvalanchesFilters = ({
  dateFrom,
  dateMode,
  dateTo,
  onDateFromChange,
  onDateModeChange,
  onDateToChange,
  onReset,
}: RecentAvalanchesFiltersProps) => {
  const t = useTranslations()

  const hasFilters = dateFrom !== null || dateTo !== null

  const dateModeOptions = [
    { label: t('admin.recentAvalanches.filters.dateMode.occurred'), value: 'occurred' },
    { label: t('admin.recentAvalanches.filters.dateMode.created'), value: 'created' },
  ]

  return (
    <div className="mb-4 flex flex-wrap items-center gap-4 rounded-sm border bg-white p-3 shadow-sm">
      <RadioGroup
        onChange={(value) => onDateModeChange(value as DateMode)}
        options={dateModeOptions}
        value={dateMode}
      />

      <div className="flex items-center gap-2">
        <DatePicker
          className="h-9 w-42"
          isClearable
          maxDate={dateTo ?? today}
          onChange={onDateFromChange}
          placeholder={t('common.words.from')}
          value={dateFrom}
        />
      </div>

      <div className="flex items-center gap-2">
        <DatePicker
          className="h-9 w-42"
          isClearable
          maxDate={today}
          minDate={dateFrom ?? undefined}
          onChange={onDateToChange}
          placeholder={t('common.words.to')}
          value={dateTo}
        />
      </div>

      {hasFilters && (
        <Button onClick={onReset} variant="outline">
          {t('admin.recentAvalanches.filters.reset')}
        </Button>
      )}
    </div>
  )
}

export default RecentAvalanchesFilters
