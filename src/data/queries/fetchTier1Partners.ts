import { cache } from 'react'
import { handleSupabaseError } from '@data/helpers'
import { convertSnakeToCamel } from '@data/helpers'
import type { Partner } from '@domain/types'

import { createClient } from '@/lib/supabase/server'

const fetchTier1Partners = cache(async (): Promise<Partner[]> => {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('partners')
    .select('*')
    .eq('is_active', true)
    .eq('tier', 1)
    .order('name_en', { ascending: true })

  handleSupabaseError(error)

  return convertSnakeToCamel(data ?? []) as Partner[]
})

export default fetchTier1Partners
