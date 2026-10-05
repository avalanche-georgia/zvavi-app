import DateRangeFilter from './DateRangeFilter'
import SearchBox from './SearchBox'
import StatusSegments from './StatusSegments'
import type { ForecastsListState } from '../hooks'
import type { ListStatusFilter } from '../model'

type ForecastsToolbarProps = {
  counts: Record<ListStatusFilter, number>
  list: ForecastsListState
  now: Date
  // Bumped by "Clear filters" so the search box drops its text and any pending write
  searchResetKey: number
}

const ForecastsToolbar = ({ counts, list, now, searchResetKey }: ForecastsToolbarProps) => (
  <div className="flex flex-wrap items-center gap-3">
    <StatusSegments counts={counts} onChange={list.onStatusChange} value={list.status} />
    <DateRangeFilter list={list} now={now} />
    <SearchBox onQueryChange={list.onQueryChange} query={list.query} resetKey={searchResetKey} />
  </div>
)

export default ForecastsToolbar
