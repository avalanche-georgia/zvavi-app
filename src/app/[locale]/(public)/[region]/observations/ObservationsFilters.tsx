import { Button, DatePicker } from '@components/ui'
import { useTranslations } from 'next-intl'

type ObservationsFiltersProps = {
  dateFrom: Date | null
  dateTo: Date | null
  onDateFromChange: (date: Date | null) => void
  onDateToChange: (date: Date | null) => void
  onReset: VoidFunction
}

const today = new Date()

const ObservationsFilters = ({
  dateFrom,
  dateTo,
  onDateFromChange,
  onDateToChange,
  onReset,
}: ObservationsFiltersProps) => {
  const t = useTranslations()

  const hasFilters = dateFrom !== null || dateTo !== null

  return (
    <div className="flex flex-wrap items-center gap-3">
      <DatePicker
        className="h-9 w-42"
        isClearable
        maxDate={dateTo ?? today}
        onChange={onDateFromChange}
        placeholder={t('common.words.from')}
        value={dateFrom}
      />

      <DatePicker
        className="h-9 w-42"
        isClearable
        maxDate={today}
        minDate={dateFrom ?? undefined}
        onChange={onDateToChange}
        placeholder={t('common.words.to')}
        value={dateTo}
      />

      {hasFilters && (
        <Button onClick={onReset} variant="outline">
          {t('observations.filters.reset')}
        </Button>
      )}
    </div>
  )
}

export default ObservationsFilters
