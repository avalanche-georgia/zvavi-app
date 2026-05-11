import { supabase } from '@data'
import type { UserProfile } from '@domain/types'

import { useQuery } from '@/tanstack-query/hooks'

import { convertSnakeToCamel } from '../../helpers'
import { userProfilesKeys } from '../../query-keys'

const fetchCurrentUserProfile = async (): Promise<UserProfile | null> => {
  const { data: authData, error: authError } = await supabase.auth.getUser()

  if (authError || !authData.user) return null

  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', authData.user.id)
    .single()

  if (error) return null
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
