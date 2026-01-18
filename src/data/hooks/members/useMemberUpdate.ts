import { supabase } from '@data'
import { membersKeys } from '@data/query-keys'
import type { MemberFormData } from '@domain/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { convertCamelToSnake, handleSupabaseError } from '../../helpers'

type UpdatePayload = MemberFormData & { id: string }

const updateMember = async ({ id, ...formData }: UpdatePayload): Promise<void> => {
  const payload = {
    ...formData,
    expiresAt: formData.expiresAt?.toISOString().split('T')[0] || null,
    joinedAt: formData.joinedAt?.toISOString().split('T')[0],
  }

  const { error } = await supabase.from('members').update(convertCamelToSnake(payload)).eq('id', id)

  handleSupabaseError(error)
}

const useMemberUpdate = () => {
  const queryClient = useQueryClient()

  return useMutation<void, Error, UpdatePayload>({
    mutationFn: updateMember,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: membersKeys.list() })
      queryClient.invalidateQueries({ queryKey: membersKeys.item(variables.id) })
    },
  })
}

export default useMemberUpdate
