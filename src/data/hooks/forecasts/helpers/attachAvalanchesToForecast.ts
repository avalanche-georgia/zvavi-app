import { supabase } from '@data'
import { convertCamelToSnake, handleSupabaseError } from '@data/helpers'
import type { Avalanche } from '@domain/types'

const attachAvalanchesToForecast = async (
  forecastId: number,
  avalanches: Omit<Avalanche, 'createdAt'>[],
): Promise<void> => {
  for (const avalanche of avalanches) {
    const { id, ...rest } = avalanche

    if (id != null) {
      // Existing avalanche — link via junction table only
      const { error } = await supabase
        .from('forecast_avalanche')
        .insert({ avalanche_id: id, forecast_id: forecastId })

      handleSupabaseError(error)
    } else {
      // New avalanche — insert row then link
      const { data: inserted, error: insertError } = await supabase
        .from('recent_avalanches')
        .insert(convertCamelToSnake(rest))
        .select('id')
        .single()

      handleSupabaseError(insertError)

      if (!inserted) throw new Error('Failed to insert avalanche')

      const { error: linkError } = await supabase
        .from('forecast_avalanche')
        .insert({ avalanche_id: inserted.id, forecast_id: forecastId })

      handleSupabaseError(linkError)
    }
  }
}

export default attachAvalanchesToForecast
