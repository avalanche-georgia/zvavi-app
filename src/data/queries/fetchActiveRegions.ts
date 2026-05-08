import { cache } from 'react'
import { handleSupabaseError } from '@data/helpers'
import { convertSnakeToCamel } from '@data/helpers'
import type { Region } from '@domain/types'

import { createClient } from '@/lib/supabase/server'

const fetchActiveRegions = cache(async (): Promise<Region[]> => {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('regions')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true })

  handleSupabaseError(error)

  return convertSnakeToCamel(data ?? []) as Region[]
})

export default fetchActiveRegions
