import type { Forecast, Region } from '@domain/types'
import { useQueries } from '@tanstack/react-query'

import { fetchCurrentForecast } from './useGetCurrentForecast'
import { forecastsKeys } from '../../query-keys'

const useCurrentForecastsPerRegion = (regions: Region[]) =>
  useQueries({
    queries: regions.map((region) => ({
      queryFn: fetchCurrentForecast,
      queryKey: forecastsKeys.current(region.id, { isShort: true }),
    })),
  }) as { data: Forecast | null | undefined; isPending: boolean }[]

export default useCurrentForecastsPerRegion
