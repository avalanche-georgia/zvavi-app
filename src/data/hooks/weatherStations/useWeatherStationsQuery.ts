import { supabase } from '@data'
import type { WeatherStation } from '@domain/types'

import { useQuery } from '@/tanstack-query/hooks'

import { convertSnakeToCamel } from '../../helpers'
import { weatherStationsKeys } from '../../query-keys'

const fetchWeatherStations = async (): Promise<WeatherStation[]> => {
  const { data, error } = await supabase
    .from('weather_stations')
    .select('*')
    .order('sort_order', { ascending: true })

  if (error) throw new Error(error.message)
  if (!data) return []

  return convertSnakeToCamel(data) as WeatherStation[]
}

const useWeatherStationsQuery = () => {
  return useQuery<WeatherStation[], Error>({
    queryFn: fetchWeatherStations,
    queryKey: weatherStationsKeys.list(),
  })
}

export default useWeatherStationsQuery
