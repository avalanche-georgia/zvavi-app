import { supabase } from '@data'
import { userProfilesKeys } from '@data/query-keys'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { convertCamelToSnake, handleSupabaseError } from '../../helpers'

type UpdatePayload = {
  id: string
  firstName: string
  lastName: string
  about: string
  avatarUrl?: string
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
    mutationFn: updateUserProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userProfilesKeys.current() })
    },
  })
}

export default useUserProfileUpdate
