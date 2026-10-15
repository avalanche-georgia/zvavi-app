import { supabase } from '@data'
import { userProfilesKeys } from '@data/query-keys'
import type { TeamProfile } from '@domain/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { handleSupabaseError } from '../../helpers'

type VisibilityPayload = { id: string; isPublic: boolean }

const updateVisibility = async ({ id, isPublic }: VisibilityPayload): Promise<void> => {
  const { error } = await supabase.rpc('set_profile_public', { p_id: id, p_is_public: isPublic })

  handleSupabaseError(error)
}

// Admin Team page: shows / hides a staff member publicly. The switch flips right
// away and flips back if saving fails.
const useProfileVisibilityUpdate = () => {
  const queryClient = useQueryClient()
  const teamKey = userProfilesKeys.team()

  return useMutation<void, Error, VisibilityPayload, { previous?: TeamProfile[] }>({
    meta: { scope: 'useProfileVisibilityUpdate' },
    mutationFn: updateVisibility,
    onError: (_error, _payload, context) => {
      queryClient.setQueryData(teamKey, context?.previous)
    },
    onMutate: async ({ id, isPublic }) => {
      await queryClient.cancelQueries({ queryKey: teamKey })
      const previous = queryClient.getQueryData<TeamProfile[]>(teamKey)

      queryClient.setQueryData<TeamProfile[]>(teamKey, (profiles) =>
        profiles?.map((profile) => (profile.id === id ? { ...profile, isPublic } : profile)),
      )

      return { previous }
    },
    // Also refreshes the signed-in user's own profile, in case it was theirs
    onSettled: () => queryClient.invalidateQueries({ queryKey: userProfilesKeys.all }),
  })
}

export default useProfileVisibilityUpdate
