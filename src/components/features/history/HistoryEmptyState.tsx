import { Button, getButtonClasses } from '@ds/primitives'
import { useTranslations } from 'next-intl'
import { Link } from 'src/i18n/navigation'

import { cn } from '@/lib/utils'
import { routes } from '@/routes'

type HistoryEmptyStateVariant = 'filters' | 'none' | 'season'

type HistoryEmptyStateProps = {
  className?: string
  // filters
  onFiltersClear?: VoidFunction
  // season
  regionId?: string
  // none: the region has no forecasts at all; season: the picked season has
  // none yet; filters: nothing matches the filters
  variant: HistoryEmptyStateVariant
}

const HistoryEmptyState = ({
  className,
  onFiltersClear,
  regionId,
  variant,
}: HistoryEmptyStateProps) => {
  const t = useTranslations()

  return (
    <div
      className={cn(
        'rounded-card border-rule-strong border-slot flex flex-col items-center gap-2 px-5 py-10 text-center',
        className,
      )}
    >
      <h2 className="text-heading text-ink font-semibold">
        {t(`forecast.history.empty.${variant}Title`)}
      </h2>
      <p className="text-copy text-muted max-w-md text-pretty">
        {t(`forecast.history.empty.${variant}Text`)}
      </p>
      {variant === 'season' && regionId && (
        <Link
          className={getButtonClasses({ className: 'mt-2', size: 'sm', variant: 'secondary' })}
          href={routes.forecastsByRegion(regionId).current}
        >
          {t('forecast.history.empty.seeLatest')}
        </Link>
      )}
      {variant === 'filters' && onFiltersClear && (
        <Button className="mt-2" onClick={onFiltersClear} size="sm" variant="secondary">
          {t('forecast.history.empty.clearFilters')}
        </Button>
      )}
    </div>
  )
}

export default HistoryEmptyState
