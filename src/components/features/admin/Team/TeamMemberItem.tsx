'use client'

import { useSortable } from '@dnd-kit/react/sortable'
import type { TeamProfile } from '@domain/types'

import TeamMemberRow from './TeamMemberRow'
import type { TeamGroupId } from './useTeamBoard'

import { cn } from '@/lib/utils'

type TeamMemberItemProps = {
  groupId: TeamGroupId
  index: number
  profile: TeamProfile
}

// A draggable person: moves within their section or into another one
const TeamMemberItem = ({ groupId, index, profile }: TeamMemberItemProps) => {
  const { handleRef, isDragSource, ref } = useSortable({
    accept: 'member',
    group: groupId,
    id: profile.id,
    index,
    type: 'member',
  })

  return (
    <li
      ref={ref}
      className={cn(
        'border-rule bg-surface border-b last:border-b-0',
        isDragSource && 'shadow-float relative z-10',
      )}
    >
      <TeamMemberRow dragHandleRef={handleRef} profile={profile} />
    </li>
  )
}

export default TeamMemberItem
