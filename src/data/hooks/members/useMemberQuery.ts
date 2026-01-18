import { supabase } from '@data'
import type { Member } from '@domain/types'
import type { QueryFunctionContext, UseQueryOptions } from '@tanstack/react-query'

import { useQuery } from '@/tanstack-query/hooks'

import { convertSnakeToCamel } from '../../helpers'
import { membersKeys } from '../../query-keys'

type QueryKey = ReturnType<typeof membersKeys.item>
type Response = Member | undefined

type QueryOptions = Omit<
  UseQueryOptions<Response, unknown, Response, QueryKey>,
  'queryKey' | 'queryFn'
> & { memberId: string }

const fetchMember = async ({ queryKey }: QueryFunctionContext<QueryKey>): Promise<Response> => {
  const [, , memberId] = queryKey

  const { data, error } = await supabase.from('members').select('*').eq('id', memberId).single()

  if (error) {
    throw new Error(error.message)
  }

  if (!data) return undefined

  return convertSnakeToCamel(data) as Response
}

const useMemberQuery = ({ memberId, ...options }: QueryOptions) =>
  useQuery({
    queryFn: fetchMember,
    queryKey: membersKeys.item(memberId),
    ...options,
  })

export default useMemberQuery
