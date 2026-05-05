import { supabase } from '@data'
import { recentAvalanchesKeys } from '@data/query-keys'
import type { AvalancheFormData } from '@domain/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { convertCamelToSnake, handleSupabaseError } from '../../helpers'

const createRecentAvalanche = async (formData: AvalancheFormData): Promise<void> => {
  const { error } = await supabase.from('recent_avalanches').insert(convertCamelToSnake(formData))

  handleSupabaseError(error)
}

const useRecentAvalancheCreate = () => {
  const queryClient = useQueryClient()

  return useMutation<void, Error, AvalancheFormData>({
    mutationFn: createRecentAvalanche,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: recentAvalanchesKeys.all })
    },
  })
}

export default useRecentAvalancheCreate
