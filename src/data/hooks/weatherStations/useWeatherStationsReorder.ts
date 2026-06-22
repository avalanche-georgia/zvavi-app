import { supabase } from '@data'
import { weatherStationsKeys } from '@data/query-keys'
import type { WeatherStation } from '@domain/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { handleSupabaseError } from '../../helpers'

const useWeatherStationsReorder = () => {
  const queryClient = useQueryClient()

  return useMutation<void, Error, WeatherStation[]>({
    mutationFn: async (ordered) => {
      const updates = ordered.map((station, index) => ({ id: station.id, sort_order: index }))
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error } = await (supabase.rpc as any)('reorder_weather_stations', { updates })

      handleSupabaseError(error)
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: weatherStationsKeys.list() })
    },
  })
}

export default useWeatherStationsReorder
