import type {
  CurrentForecastQueryVariables,
  ForecastQueryVariables,
} from '../hooks/forecasts/types'

const forecastsKeys = {
  all: ['forecastsKeys'] as const,

  current: (variables: CurrentForecastQueryVariables) =>
    [...forecastsKeys.all, 'current', variables] as const,
  item: (variables: ForecastQueryVariables) => [...forecastsKeys.all, 'item', variables] as const,
  list: () => [...forecastsKeys.all, 'list'] as const,
}

export default forecastsKeys
