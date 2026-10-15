import { convertSnakeToCamel, handleSupabaseError } from '@data/helpers'
import { staffRoles } from '@domain/constants'
import type { TeamMember } from '@domain/types'

import { createServiceRoleClient } from '@/lib/supabase/serviceRole'

// Explicit columns — never `*`: email and role must not reach the public page
const publicColumns = 'id, first_name, last_name, avatar_url, about, team, team_title, social_links'

// Staff who opted in and have a section. Service role because user_profiles is
// owner-only under RLS — server-side only.
const fetchTeamMembers = async (): Promise<TeamMember[]> => {
  const supabase = createServiceRoleClient()

  const { data, error } = await supabase
    .from('user_profiles')
    .select(publicColumns)
    .eq('is_public', true)
    .not('team', 'is', null)
    .in('role', staffRoles)
    .order('team_order', { ascending: true, nullsFirst: false })
    .order('first_name', { ascending: true })
    .order('last_name', { ascending: true })

  handleSupabaseError(error)

  return (data ?? []).flatMap((row) => {
    const { team, ...profile } = convertSnakeToCamel(row) as Omit<TeamMember, 'fullName'> & {
      team: TeamMember['team'] | null
    }
    const fullName = [profile.firstName, profile.lastName].filter(Boolean).join(' ')

    // A listed profile without a name has nothing to show
    if (!team || !fullName) return []

    return [{ ...profile, fullName, team }]
  })
}

export default fetchTeamMembers
