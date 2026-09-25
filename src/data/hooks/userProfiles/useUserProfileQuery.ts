import { supabase } from '@data'
import type { UserProfile } from '@domain/types'

import { useQuery } from '@/tanstack-query/hooks'

import { convertSnakeToCamel } from '../../helpers'
import { userProfilesKeys } from '../../query-keys'

const fetchUserProfile = async (id: string): Promise<UserProfile | null> => {
  const { data, error } = await supabase.from('user_profiles').select('*').eq('id', id).single()

  if (error || !data) return null

  const profile = convertSnakeToCamel(data) as Omit<UserProfile, 'fullName'>

  return {
    ...profile,
    fullName: [profile.firstName, profile.lastName].filter(Boolean).join(' '),
  }
}

type UseUserProfileQueryOptions = {
  enabled?: boolean
  id: string
}

const useUserProfileQuery = ({ enabled = true, id }: UseUserProfileQueryOptions) =>
  useQuery<UserProfile | null, Error>({
    enabled,
    queryFn: () => fetchUserProfile(id),
    queryKey: userProfilesKeys.item(id),
  })

export default useUserProfileQuery
