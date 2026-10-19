import HazardTile from '@components/features/forecasts/HazardTile'
import { hazardLevelNamesByScale } from '@domain/constants'
import type { AvalancheProblemType, RegionId } from '@domain/types'
import { ChevronRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Link } from 'src/i18n/navigation'

import useArchiveFormat from './hooks/useArchiveFormat'
import { getForecastRowId } from './hooks/useScrollToForecast'

import ElevationScale from './ElevationScale'
import ForecastMeta from './ForecastMeta'
import type { ArchiveForecast } from './model'

import { toPlainText } from '@/lib/toPlainText'
import { routes } from '@/routes'

type HistoryForecastRowProps = {
  forecast: ArchiveForecast
  problem: AvalancheProblemType | null
  regionId: RegionId
}

// Badge · level + dates · elevation scale + summary + tags · chevron. Stacks
// the body under the dates when the list is narrower than 720px.
const HistoryForecastRow = ({ forecast, problem, regionId }: HistoryForecastRowProps) => {
  const t = useTranslations()
  const { formatRange } = useArchiveFormat()
  const { avalancheProblems, endDay, forecaster, hazardLevels, id, startDay } = forecast
  const summary = toPlainText(forecast.summary)

  return (
    <Link
      className="group focus-ring hover:bg-canvas @container block transition-colors"
      href={routes.forecastsByRegion(regionId).view(id)}
      id={getForecastRowId(id)}
    >
      <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] gap-x-3 gap-y-0.5 py-3.5 pr-3 pl-3.5 @min-[720px]:grid-cols-[3rem_10.5rem_minmax(0,1fr)_auto] @min-[720px]:items-center @min-[720px]:gap-x-4 @min-[720px]:py-4 @min-[720px]:pr-4 @min-[720px]:pl-4.5">
        <HazardTile
          className="rounded-media text-title-sm row-span-2 size-11 @min-[720px]:row-span-1 @min-[720px]:size-12"
          level={hazardLevels.overall}
          palette="public"
          size="lg"
        />
        <div className="min-w-0">
          <p className="text-copy-lg font-semibold">
            {t(hazardLevelNamesByScale[hazardLevels.overall])}
          </p>
          <p className="text-copy-sm text-muted @min-[720px]:text-copy @min-[720px]:text-ink tabular-nums @min-[720px]:font-medium">
            {formatRange(startDay, endDay)}
          </p>
        </div>
        <ChevronRight
          aria-hidden
          className="text-placeholder group-hover:text-ink row-span-2 size-5 self-center transition group-hover:translate-x-0.5 @min-[720px]:col-start-4 @min-[720px]:row-span-1 @min-[720px]:row-start-1"
        />
        <div className="col-start-2 mt-1.5 grid grid-cols-[auto_minmax(0,1fr)] gap-3 @min-[720px]:col-start-3 @min-[720px]:row-start-1 @min-[720px]:mt-0">
          <ElevationScale hazardLevels={hazardLevels} />
          <div className="min-w-0">
            {summary && (
              <p className="text-copy-sm text-body line-clamp-2 text-pretty">{summary}</p>
            )}
            <ForecastMeta forecaster={forecaster} problem={problem} problems={avalancheProblems} />
          </div>
        </div>
      </div>
    </Link>
  )
}

export default HistoryForecastRow
