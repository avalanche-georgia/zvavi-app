import type { RegionId } from '@domain/types'
import { Button } from '@ds/primitives'
import { useTranslations } from 'next-intl'

type ForecastsEmptyStateProps = {
  hasForecasts: boolean
  onFiltersClear: VoidFunction
  regionId: RegionId
}

const ForecastsEmptyState = ({
  hasForecasts,
  onFiltersClear,
  regionId,
}: ForecastsEmptyStateProps) => {
  const t = useTranslations()

  return (
    <div className="flex flex-col items-center gap-1.5 px-6 py-14 text-center">
      <p className="text-copy-lg text-ink font-semibold">
        {hasForecasts
          ? t('admin.forecasts.empty.noMatchesTitle')
          : t('admin.forecasts.empty.noForecastsTitle', { region: t(`regions.names.${regionId}`) })}
      </p>
      <p className="text-copy-sm text-muted">
        {t(
          hasForecasts
            ? 'admin.forecasts.empty.noMatchesHint'
            : 'admin.forecasts.empty.noForecastsHint',
        )}
      </p>
      {hasForecasts && (
        <Button className="mt-2" onClick={onFiltersClear} size="sm" variant="secondary">
          {t('admin.forecasts.empty.clearFilters')}
        </Button>
      )}
    </div>
  )
}

export default ForecastsEmptyState
