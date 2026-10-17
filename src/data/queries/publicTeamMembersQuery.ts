import { convertSnakeToCamel } from '@data/helpers'
import { staffRoles } from '@domain/constants'
import type { TeamMember } from '@domain/types'

import 'server-only'
import { createServiceRoleClient } from '@/lib/supabase/serviceRole'

// Explicit columns — never `*`: email and role must not reach public pages
const publicColumns = 'id, first_name, last_name, avatar_url, about, team, team_title, social_links'

// Staff who opted in and have a section. Service role because user_profiles is
// owner-only under RLS — server-side only.
export const selectPublicTeamMembers = () =>
  createServiceRoleClient()
    .from('user_profiles')
    .select(publicColumns)
    .eq('is_public', true)
    .not('team', 'is', null)
    .in('role', staffRoles)

type PublicTeamMemberRows = NonNullable<Awaited<ReturnType<typeof selectPublicTeamMembers>>['data']>

// A listed profile without a name has nothing to show
export const toTeamMembers = (rows: PublicTeamMemberRows): TeamMember[] =>
  rows.flatMap((row) => {
    const { team, ...profile } = convertSnakeToCamel(row) as Omit<TeamMember, 'fullName'> & {
      team: TeamMember['team'] | null
    }
    const fullName = [profile.firstName, profile.lastName].filter(Boolean).join(' ')

    if (!team || !fullName) return []

    return [{ ...profile, fullName, team }]
  })
