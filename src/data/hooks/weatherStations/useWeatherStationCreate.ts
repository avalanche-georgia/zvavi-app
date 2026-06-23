import { supabase } from '@data'
import { weatherStationsKeys } from '@data/query-keys'
import type { WeatherStation, WeatherStationFormData } from '@domain/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { convertCamelToSnake, convertSnakeToCamel, handleSupabaseError } from '../../helpers'

const createWeatherStation = async (formData: WeatherStationFormData): Promise<WeatherStation> => {
  const { data, error } = await supabase
    .from('weather_stations')
    .insert(convertCamelToSnake(formData))
    .select()
    .single()

  handleSupabaseError(error)

  if (!data) throw new Error('Failed to create weather station')

  return convertSnakeToCamel(data) as WeatherStation
}

const useWeatherStationCreate = () => {
  const queryClient = useQueryClient()

  return useMutation<WeatherStation, Error, WeatherStationFormData>({
    mutationFn: createWeatherStation,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: weatherStationsKeys.list() })
    },
  })
}

export default useWeatherStationCreate
