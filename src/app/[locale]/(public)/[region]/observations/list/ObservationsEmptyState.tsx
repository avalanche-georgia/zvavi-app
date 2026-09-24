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
      <b className="text-ink mb-1.5 text-base">{t('observations.empty.title')}</b>
      {t('observations.empty.description')}
      <button
        className="border-rule text-ink hover:bg-tile mt-6 h-10.5 rounded-[11px] border bg-white px-3.5 text-sm font-semibold transition-colors"
        onClick={onFiltersClear}
        type="button"
      >
        {t('observations.filters.clear')}
      </button>
    </div>
  )
}

export default ObservationsEmptyState
