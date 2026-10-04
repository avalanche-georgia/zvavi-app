import type { ForecastListItem } from '@domain/types'

import { useForecastsTable } from './ForecastsTableContext'
import { ForecastCell, HazardTile, StatusBadge, ValidUntilCell } from '../cells'
import { getForecastListStatus } from '../model'
import { RowActions } from '../RowActions'

// ≤640px: tile spanning two rows | forecast + status | "Valid until … · ends in …" + ⋯
const ForecastCard = ({ forecast }: { forecast: ForecastListItem }) => {
  const { currentForecastId, now, regionId } = useForecastsTable()

  return (
    <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-3 gap-y-1.5">
      <HazardTile className="row-span-2" level={forecast.hazardLevels.overall} size="md" />
      <ForecastCell forecast={forecast} />
      <StatusBadge status={getForecastListStatus(forecast, currentForecastId)} />
      <ValidUntilCell isInline now={now} validUntil={forecast.validUntil} />
      <RowActions forecast={forecast} isCompact regionId={regionId} />
    </div>
  )
}

export default ForecastCard
