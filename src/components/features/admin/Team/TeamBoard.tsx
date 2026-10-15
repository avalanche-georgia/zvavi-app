'use client'

import { ListEmptyState } from '@components/features/admin/shared'
import { useToast } from '@components/hooks'
import { Loading } from '@components/shared'
import { DragDropProvider } from '@dnd-kit/react'
import type { TeamProfile } from '@domain/types'
import { useTranslations } from 'next-intl'

import TeamGroup from './TeamGroup'
import useTeamBoard, { teamGroupIds } from './useTeamBoard'

const shellClasses = 'rounded-card border-rule bg-surface overflow-clip border'

type TeamBoardProps = {
  isLoading: boolean
  profiles: TeamProfile[] | undefined
}

// Staff in their public sections: drag people between and within sections
const TeamBoard = ({ isLoading, profiles }: TeamBoardProps) => {
  const t = useTranslations()
  const { toastError } = useToast()
  const { groups, handleDragEnd, handleDragOver, handleDragStart } = useTeamBoard(
    profiles,
    (error) => toastError('TeamBoard | reorder', { error }),
  )

  if (isLoading) return <Loading className={`${shellClasses} h-60 py-0`} />

  if (!profiles?.length) {
    return (
      <div className={shellClasses}>
        <ListEmptyState hint={t('admin.team.empty.hint')} title={t('admin.team.empty.title')} />
      </div>
    )
  }

  return (
    <DragDropProvider
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDragStart={handleDragStart}
    >
      <div className="flex flex-col gap-6">
        {teamGroupIds.map((groupId) => (
          <TeamGroup key={groupId} groupId={groupId} profiles={groups[groupId]} />
        ))}
      </div>
    </DragDropProvider>
  )
}

export default TeamBoard
