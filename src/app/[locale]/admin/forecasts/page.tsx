import { Suspense } from 'react'
import { Spinner } from '@components/ui'
import { convertSnakeToCamel } from '@data/helpers'
import type { Region } from '@domain/types'
import { createClient } from 'src/lib/supabase/server'

import ForecastsContainer from './ForecastsContainer'

const fetchRegions = async (): Promise<Region[]> => {
  const supabase = await createClient()
  const { data } = await supabase
    .from('regions')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true })

  return convertSnakeToCamel(data ?? []) as Region[]
}

const ForecastsPage = async () => {
  const initialRegions = await fetchRegions()

  return (
    <Suspense fallback={<Spinner size="lg" />}>
      <ForecastsContainer initialRegions={initialRegions} />
    </Suspense>
  )
}

export default ForecastsPage
