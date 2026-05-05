import type { RegionId } from '@domain/types'

import type {
  CurrentForecastQueryVariables,
  ForecastQueryVariables,
} from '../hooks/forecasts/types'

const forecastsKeys = {
  all: ['forecastsKeys'] as const,

  allAvalanches: (regionId: RegionId) =>
    [...forecastsKeys.byRegion(regionId), 'allAvalanches'] as const,
  byRegion: (regionId: RegionId) => [...forecastsKeys.all, regionId] as const,
  current: (regionId: RegionId, variables: CurrentForecastQueryVariables) =>
    [...forecastsKeys.byRegion(regionId), 'current', variables] as const,
  item: (regionId: RegionId, variables: ForecastQueryVariables) =>
    [...forecastsKeys.byRegion(regionId), 'item', variables] as const,
  list: (regionId: RegionId) => [...forecastsKeys.byRegion(regionId), 'list'] as const,
}

export default forecastsKeys
