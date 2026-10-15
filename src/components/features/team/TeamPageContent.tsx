'use client'

import { useState } from 'react'
import type { TeamMember, TeamSection } from '@domain/types'

import JoinTeamBlock from './JoinTeamBlock'
import TeamMemberSheet from './TeamMemberSheet'
import TeamSectionList from './TeamSectionList'

// In display order
const sections: TeamSection[] = ['forecasting', 'development']

// Both sections (an empty one is left out), the profile sheet and the join block
const TeamPageContent = ({ members }: { members: TeamMember[] }) => {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  const handleMemberSelect = (member: TeamMember) => {
    setSelectedMember(member)
    setIsSheetOpen(true)
  }

  return (
    <>
      {sections.map((team) => {
        const sectionMembers = members.filter((member) => member.team === team)

        if (sectionMembers.length === 0) return null

        return (
          <TeamSectionList
            key={team}
            members={sectionMembers}
            onMemberSelect={handleMemberSelect}
            team={team}
          />
        )
      })}
      <JoinTeamBlock />
      <TeamMemberSheet isOpen={isSheetOpen} member={selectedMember} onOpenChange={setIsSheetOpen} />
    </>
  )
}

export default TeamPageContent
