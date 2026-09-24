import { Suspense } from 'react'
import { RecentAvalanchesContainer } from '@components/features/admin/RecentAvalanches'
import { Spinner } from '@components/ui'
import fetchActiveRegions from '@data/queries/fetchActiveRegions'

const ObservationsPage = async () => {
  const initialRegions = await fetchActiveRegions()

  return (
    <Suspense fallback={<Spinner size="lg" />}>
      <RecentAvalanchesContainer initialRegions={initialRegions} variant="queue" />
    </Suspense>
  )
}

export default ObservationsPage
