import { cache } from 'react'
import { handleSupabaseError } from '@data/helpers'
import { convertSnakeToCamel } from '@data/helpers'
import type { Region } from '@domain/types'
import { unstable_cache } from 'next/cache'

import { createAnonymousClient } from '@/lib/supabase/anonymous'

// Regions change only through the database and are needed by almost every
// page — cached across requests instead of queried on every navigation
const regionsRevalidateSeconds = 600

const fetchActiveRegionsFromDb = unstable_cache(
  async (): Promise<Region[]> => {
    const { data, error } = await createAnonymousClient()
      .from('regions')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true })

    handleSupabaseError(error)

    // TODO: type-safe DB conversion — https://app.asana.com/1/1208747886147296/project/1208747689500826/task/1214630622531225
    return convertSnakeToCamel(data ?? []) as Region[]
  },
  ['active-regions'],
  { revalidate: regionsRevalidateSeconds, tags: ['regions'] },
)

const fetchActiveRegions = cache(fetchActiveRegionsFromDb)

export default fetchActiveRegions
