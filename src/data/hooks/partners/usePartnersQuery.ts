import { supabase } from '@data'
import type { Partner } from '@domain/types'

import { useQuery } from '@/tanstack-query/hooks'

import { convertSnakeToCamel } from '../../helpers'
import { partnersKeys } from '../../query-keys'

const fetchPartners = async (): Promise<Partner[]> => {
  const { data, error } = await supabase
    .from('partners')
    .select('*')
    .eq('is_active', true)
    .order('name_en', { ascending: true })

  if (error) {
    throw new Error(error.message)
  }

  if (!data) return []

  return convertSnakeToCamel(data) as Partner[]
}

const usePartnersQuery = () => {
  return useQuery<Partner[], Error>({
    queryFn: fetchPartners,
    queryKey: partnersKeys.active(),
  })
}

export default usePartnersQuery
