'use client'

import { useDroppable } from '@dnd-kit/react'
import type { TeamProfile } from '@domain/types'
import { useTranslations } from 'next-intl'

import TeamMemberItem from './TeamMemberItem'
import type { TeamGroupId } from './useTeamBoard'

import { cn } from '@/lib/utils'

// Below the rows' priority: a drop over a row reorders, the empty space appends
const lowCollisionPriority = 1

type TeamGroupProps = {
  groupId: TeamGroupId
  profiles: TeamProfile[]
}

// One section of the board (or "No section"): heading, count and its people
const TeamGroup = ({ groupId, profiles }: TeamGroupProps) => {
  const t = useTranslations()
  const { isDropTarget, ref } = useDroppable({
    accept: 'member',
    collisionPriority: lowCollisionPriority,
    id: groupId,
    type: 'group',
  })
  const headingId = `team-group-${groupId}`
  const title = groupId === 'none' ? t('admin.team.noSection') : t(`team.sections.${groupId}.title`)

  return (
    <section aria-labelledby={headingId} className="flex flex-col gap-2">
      <div className="flex items-baseline gap-2">
        <h2 className="text-heading text-ink font-bold" id={headingId}>
          {title}
        </h2>
        <span className="text-copy-sm text-muted">{profiles.length}</span>
      </div>
      {groupId === 'none' && (
        <p className="text-copy-sm text-muted">{t('admin.team.noSectionHint')}</p>
      )}
      <ul
        ref={ref}
        aria-labelledby={headingId}
        className={cn(
          'rounded-card border-rule bg-surface min-h-15 overflow-clip border transition-colors',
          isDropTarget && 'border-accent bg-accent-soft/40',
        )}
      >
        {profiles.map((profile, index) => (
          <TeamMemberItem key={profile.id} groupId={groupId} index={index} profile={profile} />
        ))}
        {profiles.length === 0 && (
          <li className="text-copy-sm text-muted flex min-h-15 items-center justify-center px-4">
            {t('admin.team.dropHere')}
          </li>
        )}
      </ul>
    </section>
  )
}

export default TeamGroup
