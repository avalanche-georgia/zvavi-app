import { supabase } from '@data'
import { handleSupabaseError } from '@data/helpers'

import type { Database } from '@/lib/supabase/database.types'

const detachDetailsFromForecast = async (
  tableName: keyof Database['public']['Tables'],
  forecastId: number,
): Promise<void> => {
  const { error } = await supabase.from(tableName).delete().eq('forecast_id', forecastId)

  handleSupabaseError(error)
}

export default detachDetailsFromForecast
