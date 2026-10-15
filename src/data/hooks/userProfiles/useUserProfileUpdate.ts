import { supabase } from '@data'
import { userProfilesKeys } from '@data/query-keys'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { convertCamelToSnake, handleSupabaseError } from '../../helpers'

// Only the fields being changed; role and team are admin-set (RLS rejects them)
type UpdatePayload = {
  id: string
  firstName?: string
  lastName?: string
  about?: string
  avatarUrl?: string
  isPublic?: boolean
  socialLinks?: string[]
  teamTitle?: string | null
}

const updateUserProfile = async ({ id, ...formData }: UpdatePayload): Promise<void> => {
  const { error } = await supabase
    .from('user_profiles')
    .update(convertCamelToSnake(formData))
    .eq('id', id)

  handleSupabaseError(error)
}

const useUserProfileUpdate = () => {
  const queryClient = useQueryClient()

  return useMutation<void, Error, UpdatePayload>({
    meta: { scope: 'useUserProfileUpdate' },
    mutationFn: updateUserProfile,
    // Returned, so the mutation stays pending until the fresh profile is in
    onSuccess: () => queryClient.invalidateQueries({ queryKey: userProfilesKeys.current() }),
  })
}

export default useUserProfileUpdate
