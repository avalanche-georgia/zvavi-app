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
      <h1 className="m-0 text-2xl leading-[1.1] font-bold tracking-[-.02em]">
        {t('observations.pageTitle')}
      </h1>
      <p className="text-muted mt-1 min-h-5 text-[13px]">
        {total !== undefined &&
          (isFiltered
            ? t('observations.summary.filtered', { count: visibleCount, regionName, total })
            : t('observations.summary.total', { regionName, total }))}
      </p>
    </div>
  )
}

export default ObservationsHeader
