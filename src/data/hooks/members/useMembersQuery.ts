import { supabase } from '@data'
import type { Member } from '@domain/types'

import { useQuery } from '@/tanstack-query/hooks'

import { convertSnakeToCamel } from '../../helpers'
import { membersKeys } from '../../query-keys'

const fetchMembers = async (): Promise<Member[]> => {
  const { data, error } = await supabase
    .from('members')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    throw new Error(error.message)
  }

  if (!data) return []

  return convertSnakeToCamel(data) as Member[]
}

const useMembersQuery = () => {
  return useQuery<Member[], Error>({
    queryFn: fetchMembers,
    queryKey: membersKeys.list(),
  })
}

export default useMembersQuery
