import { supabase } from '@data'
import { recentAvalanchesKeys } from '@data/query-keys'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { handleSupabaseError } from '../../helpers'

const deleteRecentAvalanche = async (id: number): Promise<void> => {
  const { error } = await supabase.from('recent_avalanches').delete().eq('id', id)

  handleSupabaseError(error)
}

const useRecentAvalancheDelete = () => {
  const queryClient = useQueryClient()

  return useMutation<void, Error, number>({
    mutationFn: deleteRecentAvalanche,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: recentAvalanchesKeys.all })
    },
  })
}

export default useRecentAvalancheDelete
