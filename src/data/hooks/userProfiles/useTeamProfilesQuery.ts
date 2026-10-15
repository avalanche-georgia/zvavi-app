import { supabase } from '@data'
import type { TeamProfile } from '@domain/types'

import { useQuery } from '@/tanstack-query/hooks'

import { convertSnakeToCamel, handleSupabaseError } from '../../helpers'
import { userProfilesKeys } from '../../query-keys'

// Every staff profile's public part (never email) — get_team_profiles, since
// profiles themselves are owner-only
const fetchTeamProfiles = async (): Promise<TeamProfile[]> => {
  const { data, error } = await supabase.rpc('get_team_profiles')

  handleSupabaseError(error)

  return (data ?? []).map((row) => {
    const profile = convertSnakeToCamel(row) as Omit<TeamProfile, 'fullName'>

    return {
      ...profile,
      fullName: [profile.firstName, profile.lastName].filter(Boolean).join(' '),
    }
  })
}

const useTeamProfilesQuery = () =>
  useQuery<TeamProfile[], Error>({
    queryFn: fetchTeamProfiles,
    queryKey: userProfilesKeys.team(),
  })

export default useTeamProfilesQuery
