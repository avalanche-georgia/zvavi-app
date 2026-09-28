import { supabase } from '@data'
import { convertCamelToSnake, handleSupabaseError } from '@data/helpers'
import type { Avalanche } from '@domain/types'

const attachAvalanchesToForecast = async (
  forecastId: number,
  avalanches: Omit<Avalanche, 'createdAt'>[],
): Promise<void> => {
  const { data: sessionData, error: sessionError } = await supabase.auth.getSession()

  handleSupabaseError(sessionError)

  for (const avalanche of avalanches) {
    const { id, ...rest } = avalanche

    if (id != null) {
      // Existing avalanche — update record and link via junction table
      const { error: updateError } = await supabase
        .from('recent_avalanches')
        .update(convertCamelToSnake(rest))
        .eq('id', id)

      handleSupabaseError(updateError)

      const { error: linkError } = await supabase
        .from('forecast_avalanche')
        .insert({ avalanche_id: id, forecast_id: forecastId })

      handleSupabaseError(linkError)
    } else {
      // New avalanche — insert row then link
      const { data: inserted, error: insertError } = await supabase
        .from('recent_avalanches')
        .insert(
          convertCamelToSnake({ ...rest, createdByUserId: sessionData.session?.user.id ?? null }),
        )
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
