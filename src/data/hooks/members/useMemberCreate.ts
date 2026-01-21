import { supabase } from '@data'
import { membersKeys } from '@data/query-keys'
import type { Member, MemberFormData } from '@domain/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { format } from 'date-fns'

import { convertCamelToSnake, convertSnakeToCamel, handleSupabaseError } from '../../helpers'

const createMember = async (formData: MemberFormData): Promise<Member> => {
  const payload = {
    ...formData,
    expiresAt: formData.expiresAt ? format(formData.expiresAt, 'yyyy-MM-dd') : null,
    joinedAt: formData.joinedAt ? format(formData.joinedAt, 'yyyy-MM-dd') : null,
    memberId: formData.memberId || null, // Let DB generate if empty
  }

  const { data, error } = await supabase
    .from('members')
    .insert(convertCamelToSnake(payload))
    .select()
    .single()

  handleSupabaseError(error)

  if (!data) throw new Error('Failed to create member')

  return convertSnakeToCamel(data) as Member
}

const useMemberCreate = () => {
  const queryClient = useQueryClient()

  return useMutation<Member, Error, MemberFormData>({
    mutationFn: createMember,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: membersKeys.list() })
    },
  })
}

export default useMemberCreate
