import { supabase } from '@data'
import type { UserProfile } from '@domain/types'

import { useQuery } from '@/tanstack-query/hooks'

import { convertSnakeToCamel, handleSupabaseError } from '../../helpers'
import { userProfilesKeys } from '../../query-keys'

const fetchCurrentUserProfile = async (): Promise<UserProfile | null> => {
  const { data: authData, error: authError } = await supabase.auth.getUser()

  if (authError || !authData.user) return null

  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', authData.user.id)
    .maybeSingle()

  // A failed lookup isn't "no profile": the admin gate would lock staff out
  handleSupabaseError(error)
  if (!data) return null

  const profile = convertSnakeToCamel(data) as Omit<UserProfile, 'fullName'>

  return {
    ...profile,
    fullName: [profile.firstName, profile.lastName].filter(Boolean).join(' '),
  }
}

// isEnabled: false skips the lookup (e.g. no one is signed in)
const useCurrentUserProfileQuery = ({ isEnabled = true }: { isEnabled?: boolean } = {}) =>
  useQuery<UserProfile | null, Error>({
    enabled: isEnabled,
    queryFn: fetchCurrentUserProfile,
    queryKey: userProfilesKeys.current(),
  })

export default useCurrentUserProfileQuery
