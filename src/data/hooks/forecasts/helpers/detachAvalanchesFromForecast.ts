import { supabase } from '@data'
import { handleSupabaseError } from '@data/helpers'

const detachAvalanchesFromForecast = async (forecastId: number): Promise<void> => {
  const { error } = await supabase.from('forecast_avalanche').delete().eq('forecast_id', forecastId)

  handleSupabaseError(error)
}

export default detachAvalanchesFromForecast
