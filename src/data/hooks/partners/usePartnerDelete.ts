import { supabase } from '@data'
import { partnersKeys } from '@data/query-keys'
import type { Partner } from '@domain/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { handleSupabaseError } from '../../helpers'

const deletePartner = async (id: Partner['id']) => {
  const { error } = await supabase.from('partners').delete().eq('id', id)

  handleSupabaseError(error)
}

const usePartnerDelete = () => {
  const queryClient = useQueryClient()

  return useMutation<void, Error, Partner['id']>({
    mutationFn: deletePartner,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: partnersKeys.list() })
      queryClient.invalidateQueries({ queryKey: partnersKeys.active() })
    },
  })
}

export default usePartnerDelete
