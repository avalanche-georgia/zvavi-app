import { Suspense } from 'react'
import { Spinner } from '@components/ui'
import { convertSnakeToCamel } from '@data/helpers'
import type { Region } from '@domain/types'
import { createClient } from 'src/lib/supabase/server'

import RecentAvalanchesContainer from './RecentAvalanchesContainer'

const fetchRegions = async (): Promise<Region[]> => {
  const supabase = await createClient()
  const { data } = await supabase
    .from('regions')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true })

  return convertSnakeToCamel(data ?? []) as Region[]
}

const RecentAvalanchesPage = async () => {
  const initialRegions = await fetchRegions()

  return (
    <Suspense fallback={<Spinner size="lg" />}>
      <RecentAvalanchesContainer initialRegions={initialRegions} />
    </Suspense>
  )
}

export default RecentAvalanchesPage
