import { supabase } from '@data'
import type { FullForecast, RegionId } from '@domain/types'

import { useQuery } from '@/tanstack-query/hooks'

import { convertSnakeToCamel } from '../../helpers'
import { forecastsKeys } from '../../query-keys'

const fetchForecasts = async (regionId: RegionId): Promise<FullForecast[]> => {
  const { data, error } = await supabase
    .from('forecasts')
    .select('*, avalanche_problems(*)')
    .eq('region_id', regionId)
    .order('created_at', { ascending: false })

  if (error) {
    throw new Error(error.message)
  }

  if (!data) return []

  // TODO: type-safe DB conversion — https://app.asana.com/1/1208747886147296/project/1208747689500826/task/1214630622531225
  return convertSnakeToCamel(data) as FullForecast[]
}

const useForecastsQuery = (regionId: RegionId) =>
  useQuery<FullForecast[], Error>({
    queryFn: () => fetchForecasts(regionId),
    queryKey: forecastsKeys.list(regionId),
  })

export default useForecastsQuery
