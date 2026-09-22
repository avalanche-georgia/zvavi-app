import { supabase } from '@data'
import { recentAvalanchesKeys } from '@data/query-keys'
import type { AvalancheFormData, RegionId } from '@domain/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { convertCamelToSnake, handleSupabaseError } from '../../helpers'

type UpdatePayload = Partial<AvalancheFormData> & { id: number; regionId: RegionId }

const updateRecentAvalanche = async ({ id, ...formData }: UpdatePayload): Promise<void> => {
  const { error } = await supabase
    .from('recent_avalanches')
    .update(convertCamelToSnake(formData))
    .eq('id', id)

  handleSupabaseError(error)
}

const useRecentAvalancheUpdate = () => {
  const queryClient = useQueryClient()

  return useMutation<void, Error, UpdatePayload>({
    mutationFn: updateRecentAvalanche,
    onSuccess: (_, { regionId }) => {
      queryClient.invalidateQueries({ queryKey: recentAvalanchesKeys.byRegion(regionId) })
    },
  })
}

export default useRecentAvalancheUpdate
