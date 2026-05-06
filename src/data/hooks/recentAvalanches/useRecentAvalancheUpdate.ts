import { supabase } from '@data'
import { recentAvalanchesKeys } from '@data/query-keys'
import type { AvalancheFormData } from '@domain/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { convertCamelToSnake, handleSupabaseError } from '../../helpers'

type UpdatePayload = AvalancheFormData & { id: number }

const updateRecentAvalanche = async ({ id, ...formData }: UpdatePayload): Promise<void> => {
  if (!formData.regionId) throw new Error('regionId is required to update a recent avalanche')

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
    onSuccess: (_, variables) => {
      const { regionId } = variables

      queryClient.invalidateQueries({
        queryKey: regionId ? recentAvalanchesKeys.byRegion(regionId) : recentAvalanchesKeys.all,
      })
    },
  })
}

export default useRecentAvalancheUpdate
