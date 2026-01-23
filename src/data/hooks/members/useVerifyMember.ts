import { supabase } from '@data'
import { getEffectiveStatus } from '@data/helpers'
import { membersKeys } from '@data/query-keys'
import type { VerifyMemberResponse } from '@domain/types'
import type { QueryFunctionContext, UseQueryOptions } from '@tanstack/react-query'

import { useQuery } from '@/tanstack-query/hooks'

type QueryKey = ReturnType<typeof membersKeys.verify>
type Response = VerifyMemberResponse

type QueryOptions = Omit<
  UseQueryOptions<Response, unknown, Response, QueryKey>,
  'queryKey' | 'queryFn'
> & { code: string }

const applyEffectiveStatusToResponse = (response: Response): Response => {
  if (!response.success || !response.member) {
    return response
  }

  return {
    ...response,
    member: {
      ...response.member,
      status: getEffectiveStatus(response.member),
    },
  }
}

const verifyMember = async ({ queryKey }: QueryFunctionContext<QueryKey>): Promise<Response> => {
  const [, , code] = queryKey

  const { data, error } = await supabase.rpc('verify_member', {
    client_ip: null,
    client_user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : null,
    code,
  })

  if (error) {
    return { error: error.message, success: false }
  }

  return applyEffectiveStatusToResponse(data as Response)
}

const useVerifyMember = ({ code, ...options }: QueryOptions) =>
  useQuery({
    queryFn: verifyMember,
    queryKey: membersKeys.verify(code),
    staleTime: 1000 * 60 * 5, // 5 minutes
    ...options,
  })

export default useVerifyMember
