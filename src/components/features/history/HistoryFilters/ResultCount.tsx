import { Button } from '@ds/primitives'
import { useTranslations } from 'next-intl'

type ResultCountProps = {
  isFiltered: boolean
  onFiltersClear: VoidFunction
  shownCount: number
  totalCount: number
}

// "14 forecasts", or "3 of 14" + Clear while filtered. Own line on phones.
const ResultCount = ({ isFiltered, onFiltersClear, shownCount, totalCount }: ResultCountProps) => {
  const t = useTranslations()

  return (
    <div className="text-copy-sm text-muted flex items-center gap-2 max-sm:w-full sm:ml-auto">
      <span aria-live="polite">
        {isFiltered
          ? t('forecast.history.filters.shown', { shown: shownCount, total: totalCount })
          : t('forecast.history.filters.count', { count: totalCount })}
      </span>
      {isFiltered && (
        <Button onClick={onFiltersClear} size="sm" variant="text">
          {t('forecast.history.filters.clear')}
        </Button>
      )}
    </div>
  )
}

export default ResultCount
