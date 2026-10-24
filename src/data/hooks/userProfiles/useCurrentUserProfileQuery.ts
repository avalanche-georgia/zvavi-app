import { supabase } from '@data'
import type { UserProfile } from '@domain/types'
import { isAuthSessionMissingError } from '@supabase/supabase-js'

import { useQuery } from '@/tanstack-query/hooks'

import { convertSnakeToCamel, handleSupabaseError } from '../../helpers'
import { userProfilesKeys } from '../../query-keys'

const fetchCurrentUserProfile = async (): Promise<UserProfile | null> => {
  const { data: authData, error: authError } = await supabase.auth.getUser()

  // Signed out is "no profile"; any other auth failure (network, Auth down) is an
  // error, so the admin gate keeps the shell instead of showing No access to staff
  if (authError && !isAuthSessionMissingError(authError)) throw authError
  if (!authData.user) return null

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

const useCurrentUserProfileQuery = () =>
  useQuery<UserProfile | null, Error>({
    queryFn: fetchCurrentUserProfile,
    queryKey: userProfilesKeys.current(),
  })

export default useCurrentUserProfileQuery
