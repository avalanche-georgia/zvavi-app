import { cache } from 'react'
import { convertSnakeToCamel, handleSupabaseError } from '@data/helpers'
import type { WeatherStation } from '@domain/types'

import { createClient } from '@/lib/supabase/server'

const fetchWeatherStations = cache(async (): Promise<WeatherStation[]> => {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('weather_stations')
    .select()
    // Public pages only — staff would otherwise also get hidden stations here
    .eq('is_public', true)
    .order('sort_order', { ascending: true })

  handleSupabaseError(error)

  return convertSnakeToCamel(data ?? []) as WeatherStation[]
})

export default fetchWeatherStations
