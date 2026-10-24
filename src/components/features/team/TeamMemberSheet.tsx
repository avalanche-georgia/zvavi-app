'use client'

import { ProfileSocialLinks } from '@components/shared'
import type { TeamMember } from '@domain/types'
import { Sheet, SheetHeader } from '@ds/patterns'
import { useTranslations } from 'next-intl'

import TeamBadge from './TeamBadge'
import TeamMemberPhoto from './TeamMemberPhoto'

type TeamMemberSheetProps = {
  isOpen: boolean
  // Kept while closing, so the content doesn't vanish mid-animation
  member: TeamMember | null
  onOpenChange: (isOpen: boolean) => void
}

// A person's full profile: photo, role, the whole bio and their links
const TeamMemberSheet = ({ isOpen, member, onOpenChange }: TeamMemberSheetProps) => {
  const t = useTranslations()

  if (!member) return null

  const { about, avatarUrl, fullName, id, socialLinks, team, teamTitle } = member

  return (
    <Sheet
      header={<SheetHeader closeLabel={t('common.actions.close')} title={fullName} />}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      scrollKey={id}
    >
      <TeamMemberPhoto
        avatarUrl={avatarUrl}
        className="aspect-16/10 w-full"
        initialsClassName="text-display"
        name={fullName}
        width={480}
      />
      <div className="flex flex-col gap-5 px-5 pt-5.5 pb-8 lg:px-7">
        <TeamBadge team={team} title={teamTitle} />
        {about && <p className="text-copy text-body whitespace-pre-line">{about}</p>}
        <ProfileSocialLinks urls={socialLinks} />
      </div>
    </Sheet>
  )
}

export default TeamMemberSheet
