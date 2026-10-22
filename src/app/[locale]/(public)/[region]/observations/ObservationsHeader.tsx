import { useTranslations } from 'next-intl'

type ObservationsHeaderProps = {
  ref?: React.Ref<HTMLDivElement>
  regionName: string
  // Unfiltered total; undefined while loading
  total: number | undefined
  visibleCount: number | undefined
}

// "Gudauri · 12 reports", or "Gudauri · 3 of 12 reports" while filtered
const ObservationsHeader = ({ ref, regionName, total, visibleCount }: ObservationsHeaderProps) => {
  const t = useTranslations()

  const isFiltered = visibleCount !== undefined && visibleCount !== total

  return (
    <div ref={ref} className="px-4 pt-4.5 pb-1">
      <h1 className="text-title m-0 font-bold">{t('observations.pageTitle')}</h1>
      {/* A no-break space holds the line while the count loads */}
      <p className="text-copy-sm text-muted mt-1">
        {total === undefined
          ? '\u00A0'
          : isFiltered
            ? t('observations.summary.filtered', { count: visibleCount, regionName, total })
            : t('observations.summary.total', { regionName, total })}
      </p>
    </div>
  )
}

export default ObservationsHeader
