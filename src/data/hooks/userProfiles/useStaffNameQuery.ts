import { supabase } from '@data'

import { useQuery } from '@/tanstack-query/hooks'

import { handleSupabaseError } from '../../helpers'
import { userProfilesKeys } from '../../query-keys'

// A team member's display name ("First Last") — the only part of a colleague's
// profile staff can read (get_staff_name; profiles themselves are owner-only)
const fetchStaffName = async (id: string): Promise<string | null> => {
  const { data, error } = await supabase.rpc('get_staff_name', { p_id: id })

  handleSupabaseError(error)

  return data || null
}

type UseStaffNameQueryOptions = {
  enabled?: boolean
  id: string
}

const useStaffNameQuery = ({ enabled = true, id }: UseStaffNameQueryOptions) =>
  useQuery<string | null, Error>({
    enabled,
    queryFn: () => fetchStaffName(id),
    queryKey: userProfilesKeys.name(id),
  })

export default useStaffNameQuery
