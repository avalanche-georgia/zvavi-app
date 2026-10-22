import { Button } from '@ds/primitives'
import { useTranslations } from 'next-intl'

type ObservationsEmptyStateProps = {
  hasFilters: boolean
  onFiltersClear: VoidFunction
}

const ObservationsEmptyState = ({ hasFilters, onFiltersClear }: ObservationsEmptyStateProps) => {
  const t = useTranslations()

  if (!hasFilters) {
    return <p className="text-muted px-4 py-12 text-center">{t('observations.empty.noReports')}</p>
  }

  return (
    <div className="text-muted flex flex-col items-center px-4 py-12 text-center">
      <b className="text-ink text-heading mb-1.5">{t('observations.empty.title')}</b>
      {t('observations.empty.description')}
      <Button className="mt-6" onClick={onFiltersClear} size="sm" variant="secondary">
        {t('observations.filters.clear')}
      </Button>
    </div>
  )
}

export default ObservationsEmptyState
