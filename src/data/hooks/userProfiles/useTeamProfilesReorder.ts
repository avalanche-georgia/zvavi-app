import { supabase } from '@data'
import { userProfilesKeys } from '@data/query-keys'
import type { TeamOrderUpdate } from '@domain/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { handleSupabaseError } from '../../helpers'

const reorderKey = [...userProfilesKeys.team(), 'reorder'] as const

const reorderTeamProfiles = async (updates: TeamOrderUpdate[]): Promise<void> => {
  const { error } = await supabase.rpc('reorder_team_profiles', {
    updates: updates.map(({ id, team, teamOrder }) => ({ id, team, team_order: teamOrder })),
  })

  handleSupabaseError(error)
}

// Saves the admin Team board after a drop: sections and positions in one call.
// Drops are saved one after another (same scope), so a slow save can never land
// after a newer one; the board's new order is already in the cache (the caller
// puts it there), and a failure reloads what was actually saved.
const useTeamProfilesReorder = () => {
  const queryClient = useQueryClient()

  return useMutation<void, Error, TeamOrderUpdate[]>({
    meta: { scope: 'useTeamProfilesReorder' },
    mutationFn: reorderTeamProfiles,
    mutationKey: reorderKey,
    onSettled: () => {
      // A refetch between queued saves would show a half-saved board
      if (queryClient.isMutating({ mutationKey: reorderKey }) > 1) return

      return queryClient.invalidateQueries({ queryKey: userProfilesKeys.all })
    },
    scope: { id: 'team-reorder' },
  })
}

export default useTeamProfilesReorder
