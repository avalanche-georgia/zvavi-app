import { supabase } from '@data'
import { membersKeys } from '@data/query-keys'
import type { Member } from '@domain/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { handleSupabaseError } from '../../helpers'

const deleteMember = async (id: Member['id']) => {
  const { error } = await supabase.from('members').delete().eq('id', id)

  handleSupabaseError(error)
}

const useMemberDelete = () => {
  const queryClient = useQueryClient()

  return useMutation<void, Error, Member['id']>({
    mutationFn: deleteMember,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: membersKeys.list() })
    },
  })
}

export default useMemberDelete
