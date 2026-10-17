import { handleSupabaseError } from '@data/helpers'
import type { TeamMember } from '@domain/types'

import { selectPublicTeamMembers, toTeamMembers } from './publicTeamMembersQuery'

import 'server-only'

// One person's public Team profile; null when they aren't listed (opted out,
// no section, no longer staff)
const fetchTeamMember = async (id: string): Promise<TeamMember | null> => {
  const { data, error } = await selectPublicTeamMembers().eq('id', id).maybeSingle()

  handleSupabaseError(error)

  return data ? (toTeamMembers([data])[0] ?? null) : null
}

export default fetchTeamMember
