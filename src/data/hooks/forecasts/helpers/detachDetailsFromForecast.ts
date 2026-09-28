import { supabase } from '@data'
import { handleSupabaseError } from '@data/helpers'

import type { Database } from '@/lib/supabase/database.types'

type Tables = Database['public']['Tables']

// Tables whose rows belong to a forecast (they have a `forecast_id` column)
type ForecastDetailsTable = {
  [Name in keyof Tables]: 'forecast_id' extends keyof Tables[Name]['Row'] ? Name : never
}[keyof Tables]

const detachDetailsFromForecast = async (
  tableName: ForecastDetailsTable,
  forecastId: number,
): Promise<void> => {
  const { error } = await supabase.from(tableName).delete().eq('forecast_id', forecastId)

  handleSupabaseError(error)
}

export default detachDetailsFromForecast
