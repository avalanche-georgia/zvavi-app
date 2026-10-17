import { supabase } from '@data'
import { weatherStationsKeys } from '@data/query-keys'
import type { WeatherStation } from '@domain/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { handleSupabaseError } from '../../helpers'

type VisibilityPayload = { id: string; isPublic: boolean }

const updateVisibility = async ({ id, isPublic }: VisibilityPayload): Promise<void> => {
  const { error } = await supabase
    .from('weather_stations')
    .update({ is_public: isPublic })
    .eq('id', id)

  handleSupabaseError(error)
}

// Admin list: shows / hides a station on the public page. The switch flips right
// away and flips back if saving fails.
const useWeatherStationVisibilityUpdate = () => {
  const queryClient = useQueryClient()
  const listKey = weatherStationsKeys.list()

  return useMutation<void, Error, VisibilityPayload, { previous?: WeatherStation[] }>({
    meta: { scope: 'useWeatherStationVisibilityUpdate' },
    mutationFn: updateVisibility,
    onError: (_error, _payload, context) => {
      // Nothing cached before the toggle: leave it to the refetch below
      if (context?.previous) queryClient.setQueryData(listKey, context.previous)
    },
    onMutate: async ({ id, isPublic }) => {
      await queryClient.cancelQueries({ queryKey: listKey })
      const previous = queryClient.getQueryData<WeatherStation[]>(listKey)

      queryClient.setQueryData<WeatherStation[]>(listKey, (stations) =>
        stations?.map((station) => (station.id === id ? { ...station, isPublic } : station)),
      )

      return { previous }
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: listKey }),
  })
}

export default useWeatherStationVisibilityUpdate
