import { useMemo, useRef, useState } from 'react'
import { useTeamProfilesReorder } from '@data/hooks/userProfiles'
import { userProfilesKeys } from '@data/query-keys'
import { move } from '@dnd-kit/helpers'
import type { DragDropEventHandlers } from '@dnd-kit/react'
import type { TeamOrderUpdate, TeamProfile, TeamSection } from '@domain/types'
import { useQueryClient } from '@tanstack/react-query'

export type TeamGroupId = TeamSection | 'none'
export type TeamGroups = Record<TeamGroupId, TeamProfile[]>

// In display order; "none" = no section, not on the public page
export const teamGroupIds: TeamGroupId[] = ['forecasting', 'development', 'none']

const toTeam = (groupId: TeamGroupId) => (groupId === 'none' ? null : groupId)

// Profiles arrive in board order (section position, then name)
const toGroups = (profiles: TeamProfile[]): TeamGroups => {
  const groups: TeamGroups = { development: [], forecasting: [], none: [] }

  profiles.forEach((profile) => groups[profile.team ?? 'none'].push(profile))

  return groups
}

// Back to the cached list's shape, in board order
const toProfiles = (groups: TeamGroups): TeamProfile[] =>
  teamGroupIds.flatMap((groupId) =>
    groups[groupId].map((profile) => ({ ...profile, team: toTeam(groupId) })),
  )

const toUpdates = (groups: TeamGroups): TeamOrderUpdate[] =>
  teamGroupIds.flatMap((groupId) =>
    groups[groupId].map(({ id }, index) => ({
      id,
      team: toTeam(groupId),
      teamOrder: groupId === 'none' ? null : index,
    })),
  )

const toOrderKey = (groups: TeamGroups) => JSON.stringify(toUpdates(groups))

// The board is the cached list. While dragging, people move live in a local copy
// (kept in a ref too, so the drop saves exactly what is on screen); on drop the
// new order goes into the cache and is saved
const useTeamBoard = (profiles: TeamProfile[] | undefined, onError: (error: Error) => void) => {
  const queryClient = useQueryClient()
  const { mutate: reorder } = useTeamProfilesReorder()
  const savedGroups = useMemo(() => toGroups(profiles ?? []), [profiles])
  const [dragGroups, setDragGroups] = useState<TeamGroups | null>(null)
  const dragGroupsRef = useRef<TeamGroups | null>(null)

  const setDragState = (groups: TeamGroups | null) => {
    dragGroupsRef.current = groups
    setDragGroups(groups)
  }

  const handleDragStart: DragDropEventHandlers['onDragStart'] = () => setDragState(savedGroups)

  const handleDragOver: DragDropEventHandlers['onDragOver'] = (event) => {
    setDragState(move(dragGroupsRef.current ?? savedGroups, event))
  }

  const handleDragEnd: DragDropEventHandlers['onDragEnd'] = (event) => {
    const finalGroups = dragGroupsRef.current

    if (event.canceled || !finalGroups || toOrderKey(finalGroups) === toOrderKey(savedGroups)) {
      setDragState(null)

      return
    }

    // A refetch still in flight would bring back the old order
    void queryClient.cancelQueries({ queryKey: userProfilesKeys.team() })
    queryClient.setQueryData(userProfilesKeys.team(), toProfiles(finalGroups))
    setDragState(null)

    reorder(toUpdates(finalGroups), {
      onError: (error) => {
        void queryClient.invalidateQueries({ queryKey: userProfilesKeys.team() })
        onError(error)
      },
    })
  }

  return { groups: dragGroups ?? savedGroups, handleDragEnd, handleDragOver, handleDragStart }
}

export default useTeamBoard
