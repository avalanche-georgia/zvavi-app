import { Suspense } from 'react'
import { RecentAvalanchesContainer } from '@components/features/admin/RecentAvalanches'
import { Spinner } from '@components/ui'
import { convertSnakeToCamel } from '@data/helpers'
import type { Region } from '@domain/types'
import { createClient } from 'src/lib/supabase/server'

const fetchRegions = async (): Promise<Region[]> => {
  const supabase = await createClient()
  const { data } = await supabase
    .from('regions')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true })

  return convertSnakeToCamel(data ?? []) as Region[]
}

const ObservationsPage = async () => {
  const initialRegions = await fetchRegions()

  return (
    <Suspense fallback={<Spinner size="lg" />}>
      <RecentAvalanchesContainer
        hideCreateAction
        initialRegions={initialRegions}
        source="external"
      />
    </Suspense>
  )
}

export default ObservationsPage
