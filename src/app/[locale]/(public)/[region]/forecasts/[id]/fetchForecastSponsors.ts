import { convertSnakeToCamel } from '@data/helpers'
import type { Partner } from '@domain/types'

import 'server-only'
import { reportServerError } from '@/lib/posthog/server'
import { createClient } from '@/lib/supabase/server'

// Active partners for the forecast's sponsors card (it shows tiers 1–2). Only that card
// needs them: a failed load is reported and hides it instead of failing the forecast.
const fetchForecastSponsors = async (): Promise<Partner[]> => {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('partners')
    .select('*')
    .eq('is_active', true)
    .order('name_en', { ascending: true })

  if (error) {
    reportServerError(new Error(error.message), { scope: 'fetchForecastSponsors' })

    return []
  }

  // TODO: type-safe DB conversion — https://app.asana.com/1/1208747886147296/project/1208747689500826/task/1214630622531225
  return convertSnakeToCamel(data ?? []) as Partner[]
}

export default fetchForecastSponsors
