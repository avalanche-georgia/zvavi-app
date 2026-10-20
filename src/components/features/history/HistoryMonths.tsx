import type { AvalancheProblemType, RegionId } from '@domain/types'

import useArchiveFormat from './hooks/useArchiveFormat'

import HistoryForecastRow from './HistoryForecastRow'
import type { ArchiveMonth } from './model'

type HistoryMonthsProps = {
  months: ArchiveMonth[]
  // The problem filter, highlighted in the rows' tags
  problem: AvalancheProblemType | null
  regionId: RegionId
}

// A card of rows per month, in the list's sort order
const HistoryMonths = ({ months, problem, regionId }: HistoryMonthsProps) => {
  const { formatMonth } = useArchiveFormat()

  return (
    <div className="flex flex-col">
      {months.map(({ forecasts, monthId }) => (
        <section key={monthId}>
          <h2 className="text-caption text-muted tracking-eyebrow px-1 pt-4.5 pb-2 font-semibold uppercase">
            {formatMonth(monthId)}{' '}
            <span className="text-placeholder font-medium tracking-normal normal-case">
              {forecasts.length}
            </span>
          </h2>
          <ul className="rounded-card border-rule bg-surface divide-rule divide-y overflow-hidden border">
            {forecasts.map((forecast) => (
              <li key={forecast.id}>
                <HistoryForecastRow forecast={forecast} problem={problem} regionId={regionId} />
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}

export default HistoryMonths
