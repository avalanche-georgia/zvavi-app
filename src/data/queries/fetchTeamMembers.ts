import { handleSupabaseError } from '@data/helpers'
import type { TeamMember } from '@domain/types'

import { selectPublicTeamMembers, toTeamMembers } from './publicTeamMembersQuery'

import 'server-only'

// Everyone on the public Team page, in the board's order
const fetchTeamMembers = async (): Promise<TeamMember[]> => {
  const { data, error } = await selectPublicTeamMembers()
    .order('team_order', { ascending: true, nullsFirst: false })
    .order('first_name', { ascending: true })
    .order('last_name', { ascending: true })

  handleSupabaseError(error)

  return toTeamMembers(data ?? [])
}

export default fetchTeamMembers
