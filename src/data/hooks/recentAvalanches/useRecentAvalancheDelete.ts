import { supabase } from '@data'
import { recentAvalanchesKeys } from '@data/query-keys'
import type { RegionId } from '@domain/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { handleSupabaseError } from '../../helpers'

type DeleteAvalanchePayload = { id: number; regionId: RegionId }

const deleteRecentAvalanche = async ({ id }: DeleteAvalanchePayload): Promise<void> => {
  const { error } = await supabase.from('recent_avalanches').delete().eq('id', id)

  handleSupabaseError(error)
}

const useRecentAvalancheDelete = () => {
  const queryClient = useQueryClient()

  return useMutation<void, Error, DeleteAvalanchePayload>({
    mutationFn: deleteRecentAvalanche,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: recentAvalanchesKeys.byRegion(variables.regionId),
      })
    },
  })
}

export default useRecentAvalancheDelete
