'use client'

import { useToast } from '@components/hooks'
import UserAvatar from '@components/shared/UserAvatar'
import { useProfileVisibilityUpdate } from '@data/hooks/userProfiles'
import type { TeamProfile } from '@domain/types'
import { IconButton, Switch } from '@ds/primitives'
import { GripVertical } from 'lucide-react'
import { useTranslations } from 'next-intl'

type TeamMemberRowProps = {
  dragHandleRef: (element: Element | null) => void
  profile: TeamProfile
}

// Drag handle, photo and name, and the switch that lists the person publicly
const TeamMemberRow = ({ dragHandleRef, profile }: TeamMemberRowProps) => {
  const t = useTranslations()
  const { toastError } = useToast()
  const { mutate: updateVisibility } = useProfileVisibilityUpdate()
  const { avatarUrl, fullName, id, isPublic } = profile
  const name = fullName || t('admin.team.noName')

  const handleCheckedChange = (checked: boolean) => {
    updateVisibility(
      { id, isPublic: checked },
      { onError: (error) => toastError('TeamMemberRow | visibility', { error }) },
    )
  }

  return (
    <div className="flex min-h-15 items-center gap-2 py-2 pr-4 pl-2">
      <IconButton
        ref={dragHandleRef}
        aria-label={t('admin.team.dragMember', { name })}
        className="text-muted cursor-grab touch-none active:cursor-grabbing"
        tooltip={t('admin.team.dragToMove')}
      >
        <GripVertical className="size-4.5" />
      </IconButton>
      <UserAvatar avatarUrl={avatarUrl} className="size-9" name={name} userId={id} />
      <span className="text-copy text-ink min-w-0 flex-1 font-semibold wrap-anywhere">{name}</span>
      <Switch
        checked={isPublic}
        className="shrink-0"
        label={
          <>
            {t('admin.team.public')}
            <span className="sr-only">{` — ${name}`}</span>
          </>
        }
        onCheckedChange={handleCheckedChange}
      />
    </div>
  )
}

export default TeamMemberRow
