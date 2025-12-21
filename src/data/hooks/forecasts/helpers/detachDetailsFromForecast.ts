import { supabase } from '@data'
import { handleSupabaseError } from '@data/helpers'

const detachDetailsFromForecast = async (tableName: string, forecastId: number): Promise<void> => {
  const { error } = await supabase.from(tableName).delete().eq('forecast_id', forecastId)

  handleSupabaseError(error)
}

export default detachDetailsFromForecast
