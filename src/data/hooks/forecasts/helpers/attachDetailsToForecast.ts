import { supabase } from '@data'
import { convertCamelToSnake, handleSupabaseError } from '@data/helpers'

import type { Database } from '@/lib/supabase/database.types'

const attachDetailsToForecast = async <T>(
  tableName: keyof Database['public']['Tables'],
  forecastId: number,
  items: T[],
): Promise<void> => {
  const formattedItems = items.map((item) => ({
    ...convertCamelToSnake(item),
    forecast_id: forecastId,
  }))

  const { error } = await supabase.from(tableName).insert(formattedItems)

  handleSupabaseError(error)
}

export default attachDetailsToForecast
