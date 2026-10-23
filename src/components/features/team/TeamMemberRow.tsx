import type { TeamMember } from '@domain/types'

import TeamBadge from './TeamBadge'
import TeamMemberPhoto from './TeamMemberPhoto'

type TeamMemberRowProps = {
  member: TeamMember
  onMemberSelect: (member: TeamMember) => void
}

// One person in a section list: the whole row opens their profile
const TeamMemberRow = ({ member, onMemberSelect }: TeamMemberRowProps) => {
  const { about, avatarUrl, fullName, team, teamTitle } = member

  return (
    <li className="border-rule not-first:border-t">
      <button
        className="focus-ring hover:bg-tile/50 grid w-full grid-cols-[48px_1fr] items-start gap-x-3.5 gap-y-2 px-4 py-3.5 text-left transition-colors md:grid-cols-[56px_minmax(0,220px)_1fr] md:items-center md:gap-x-4.5"
        onClick={() => onMemberSelect(member)}
        type="button"
      >
        <TeamMemberPhoto
          avatarUrl={avatarUrl}
          className="row-span-2 size-12 rounded-full md:row-span-1 md:size-14"
          initialsClassName="text-heading"
          name={fullName}
          width={56}
        />
        <span className="flex min-w-0 flex-col items-start gap-1">
          <span className="text-heading text-ink font-semibold wrap-anywhere">{fullName}</span>
          <TeamBadge team={team} title={teamTitle} />
        </span>
        {about && (
          <span className="text-copy-sm text-body col-start-2 line-clamp-3 md:col-start-3 md:line-clamp-2">
            {about}
          </span>
        )}
      </button>
    </li>
  )
}

export default TeamMemberRow
