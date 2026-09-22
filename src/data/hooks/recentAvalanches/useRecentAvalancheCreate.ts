import { supabase } from '@data'
import { recentAvalanchesKeys } from '@data/query-keys'
import type { AvalancheFormData } from '@domain/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { convertCamelToSnake, handleSupabaseError } from '../../helpers'

const createRecentAvalanche = async (formData: AvalancheFormData): Promise<void> => {
  if (!formData.regionId) throw new Error('regionId is required to create a recent avalanche')

  const { data: sessionData, error: sessionError } = await supabase.auth.getSession()

  handleSupabaseError(sessionError)

  const { error } = await supabase.from('recent_avalanches').insert(
    convertCamelToSnake({
      ...formData,
      createdByUserId: sessionData.session?.user.id ?? null,
      source: 'team',
    }),
  )

  handleSupabaseError(error)
}

const useRecentAvalancheCreate = () => {
  const queryClient = useQueryClient()

  return useMutation<void, Error, AvalancheFormData>({
    mutationFn: createRecentAvalanche,
    onSuccess: (_, variables) => {
      const { regionId } = variables

      queryClient.invalidateQueries({
        queryKey: regionId ? recentAvalanchesKeys.byRegion(regionId) : recentAvalanchesKeys.all,
      })
    },
  })
}

export default useRecentAvalancheCreate
