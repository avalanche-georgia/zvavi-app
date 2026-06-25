import { supabase } from '@data'
import { weatherStationsKeys } from '@data/query-keys'
import type { WeatherStation } from '@domain/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { handleSupabaseError } from '../../helpers'

const deleteWeatherStation = async (id: WeatherStation['id']): Promise<void> => {
  const { error } = await supabase.from('weather_stations').delete().eq('id', id)

  handleSupabaseError(error)
}

const useWeatherStationDelete = () => {
  const queryClient = useQueryClient()

  return useMutation<void, Error, WeatherStation['id']>({
    mutationFn: deleteWeatherStation,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: weatherStationsKeys.list() })
    },
  })
}

export default useWeatherStationDelete
