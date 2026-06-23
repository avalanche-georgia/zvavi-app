import { supabase } from '@data'
import { weatherStationsKeys } from '@data/query-keys'
import type { WeatherStationFormData } from '@domain/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { convertCamelToSnake, handleSupabaseError } from '../../helpers'

type UpdatePayload = Partial<WeatherStationFormData> & { id: string }

const updateWeatherStation = async ({ id, ...formData }: UpdatePayload): Promise<void> => {
  const { error } = await supabase
    .from('weather_stations')
    .update(convertCamelToSnake(formData))
    .eq('id', id)

  handleSupabaseError(error)
}

const useWeatherStationUpdate = () => {
  const queryClient = useQueryClient()

  return useMutation<void, Error, UpdatePayload>({
    mutationFn: updateWeatherStation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: weatherStationsKeys.list() })
    },
  })
}

export default useWeatherStationUpdate
