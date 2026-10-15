import type { TeamMember, TeamSection } from '@domain/types'
import { useTranslations } from 'next-intl'

import TeamMemberRow from './TeamMemberRow'

type TeamSectionListProps = {
  members: TeamMember[]
  onMemberSelect: (member: TeamMember) => void
  team: TeamSection
}

// "Forecasters" / "Development team": heading with a count, what they do, the people
const TeamSectionList = ({ members, onMemberSelect, team }: TeamSectionListProps) => {
  const t = useTranslations()
  const headingId = `team-${team}`

  return (
    <section aria-labelledby={headingId} className="border-rule border-t py-6 lg:py-8">
      <div className="flex items-baseline gap-2.5">
        <h2 className="text-title-sm font-bold" id={headingId}>
          {t(`team.sections.${team}.title`)}
        </h2>
        <span className="text-copy text-muted font-medium">
          {t('team.count', { count: members.length })}
        </span>
      </div>
      <p className="text-copy text-body mt-1 mb-4.5 max-w-[64ch]">
        {t(`team.sections.${team}.description`)}
      </p>
      <ul className="bg-surface border-rule rounded-card overflow-hidden border">
        {members.map((member) => (
          <TeamMemberRow key={member.id} member={member} onMemberSelect={onMemberSelect} />
        ))}
      </ul>
    </section>
  )
}

export default TeamSectionList
