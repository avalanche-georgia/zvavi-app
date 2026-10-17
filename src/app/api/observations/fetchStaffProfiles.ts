import { handleSupabaseError } from '@data/helpers'
import { isStaffRole } from '@domain/constants'

import 'server-only'
import { reportServerError } from '@/lib/posthog/server'
import { createServiceRoleClient } from '@/lib/supabase/serviceRole'

export type StaffProfile = {
  // Only for people listed on the public Team page — same rule as the forecaster's photo
  avatarUrl: string | null
  // "First Last"
  name: string
}

// Who logged team records, by user id. Service role because user_profiles is
// owner-only under RLS — name and photo only, never other columns. A failed
// lookup only costs the names: those records show the Team badge alone.
const fetchStaffProfiles = async (ids: string[]): Promise<Map<string, StaffProfile>> => {
  if (ids.length === 0) return new Map()

  try {
    const { data, error } = await createServiceRoleClient()
      .from('user_profiles')
      .select('id, first_name, last_name, avatar_url, is_public, team, role')
      .in('id', ids)

    handleSupabaseError(error)

    return new Map(
      (data ?? []).map((profile) => {
        const isListed = profile.is_public && profile.team !== null && isStaffRole(profile.role)

        return [
          profile.id,
          {
            avatarUrl: isListed ? profile.avatar_url : null,
            name: [profile.first_name, profile.last_name].filter(Boolean).join(' '),
          },
        ]
      }),
    )
  } catch (error) {
    reportServerError(error, { scope: 'fetchStaffProfiles' })

    return new Map()
  }
}

export default fetchStaffProfiles
