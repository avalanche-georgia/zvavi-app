import { hazardLevelNamesByScale } from '@domain/constants'
import type { ForecastListItem } from '@domain/types'
import { useTranslations } from 'next-intl'

import { useForecastsTable } from './ForecastsTableContext'
import { getForecastListStatus, HazardTile, StatusBadge } from '../../shared'
import { ForecastCell, ValidUntilCell } from '../cells'
import { RowActions } from '../RowActions'

// ≤640px: tile spanning two rows | forecast + status | "Valid until … · ends in …" + ⋯
const ForecastCard = ({ forecast }: { forecast: ForecastListItem }) => {
  const t = useTranslations()
  const { currentForecastId, now, regionId } = useForecastsTable()
  const { overall } = forecast.hazardLevels
  const levelName = t(hazardLevelNamesByScale[overall])

  return (
    <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-3 gap-y-1.5">
      <HazardTile
        className="row-span-2"
        label={levelName}
        level={overall}
        size="md"
        title={t('admin.forecasts.list.overallTitle', { level: levelName })}
      />
      <ForecastCell forecast={forecast} />
      <StatusBadge status={getForecastListStatus(forecast, currentForecastId)} />
      <ValidUntilCell isInline now={now} validUntil={forecast.validUntil} />
      <RowActions forecast={forecast} isCompact regionId={regionId} />
    </div>
  )
}

export default ForecastCard
