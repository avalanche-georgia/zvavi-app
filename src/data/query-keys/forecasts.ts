import type { RegionId } from '@domain/types'

import type {
  CurrentForecastQueryVariables,
  ForecastQueryVariables,
} from '../hooks/forecasts/types'

const forecastsKeys = {
  // Admin list — its own key: `list` is the public history list, a different shape
  adminList: (regionId: RegionId) => [...forecastsKeys.byRegion(regionId), 'adminList'] as const,

  all: ['forecastsKeys'] as const,

  byRegion: (regionId: RegionId) => [...forecastsKeys.all, regionId] as const,
  current: (regionId: RegionId, variables: CurrentForecastQueryVariables) =>
    [...forecastsKeys.byRegion(regionId), 'current', variables] as const,
  item: (regionId: RegionId | undefined, variables: ForecastQueryVariables) =>
    [...forecastsKeys.all, regionId, 'item', variables] as const,
  list: (regionId: RegionId) => [...forecastsKeys.byRegion(regionId), 'list'] as const,
}

export default forecastsKeys
