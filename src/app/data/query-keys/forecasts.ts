import type {
  CurrentForecastQueryVariables,
  ForecastQueryVariables,
  ForecastsQueryVariables,
} from '../hooks/forecasts/types'

const forecastsKeys = {
  all: ['forecastsKeys'] as const,

  current: (variables: CurrentForecastQueryVariables) =>
    [...forecastsKeys.all, 'current', variables] as const,
  item: (variables: ForecastQueryVariables) => [...forecastsKeys.all, 'item', variables] as const,
  list: (variables?: ForecastsQueryVariables) => [...forecastsKeys.all, 'list', variables] as const,
}

export default forecastsKeys
