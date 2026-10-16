import { supabase } from '@data'
import type { memberPaymentMethods } from '@domain/constants'
import type { QueryFunctionContext } from '@tanstack/react-query'

import { useQuery } from '@/tanstack-query/hooks'

import { handleSupabaseError } from '../../helpers'
import { membersKeys } from '../../query-keys'

type QueryKey = ReturnType<typeof membersKeys.application>

// What the member chose when applying online; null for members added by an admin
export type MemberApplicationSummary = {
  createdAt: string
  paymentMethod: (typeof memberPaymentMethods)[number]
} | null

const fetchMemberApplication = async ({
  queryKey,
}: QueryFunctionContext<QueryKey>): Promise<MemberApplicationSummary> => {
  const [, , memberId] = queryKey

  const { data, error } = await supabase
    .from('member_applications')
    .select('created_at, payment_method')
    .eq('member_id', memberId)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  handleSupabaseError(error)

  // payment_method is text in the DB; the application route only ever stores these values
  return (
    data && {
      createdAt: data.created_at,
      paymentMethod: data.payment_method as (typeof memberPaymentMethods)[number],
    }
  )
}

// The member's latest online application
const useMemberApplicationQuery = (memberId: string) =>
  useQuery({
    queryFn: fetchMemberApplication,
    queryKey: membersKeys.application(memberId),
  })

export default useMemberApplicationQuery
