import { handleSupabaseError } from '@data/helpers'

import 'server-only'
import { reportServerError } from '@/lib/posthog/server'
import { createServiceRoleClient } from '@/lib/supabase/serviceRole'

// "First Last" of the staff who logged team records, by user id. Service role
// because user_profiles is owner-only under RLS — names only, never other
// columns. A failed lookup only costs the names: those records show the Team
// badge alone.
const fetchStaffNames = async (ids: string[]): Promise<Map<string, string>> => {
  if (ids.length === 0) return new Map()

  try {
    const { data, error } = await createServiceRoleClient()
      .from('user_profiles')
      .select('id, first_name, last_name')
      .in('id', ids)

    handleSupabaseError(error)

    return new Map(
      (data ?? []).map((profile) => [
        profile.id,
        [profile.first_name, profile.last_name].filter(Boolean).join(' '),
      ]),
    )
  } catch (error) {
    reportServerError(error, { scope: 'fetchStaffNames' })

    return new Map()
  }
}

export default fetchStaffNames
