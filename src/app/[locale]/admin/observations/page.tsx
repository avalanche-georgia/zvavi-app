import { Suspense } from 'react'
import { RecentAvalanchesContainer } from '@components/features/admin/RecentAvalanches'
import Loading from '@components/features/admin/shared/Loading'
import fetchActiveRegions from '@data/queries/fetchActiveRegions'

const ObservationsPage = async () => {
  const initialRegions = await fetchActiveRegions()

  return (
    <Suspense fallback={<Loading isPage />}>
      <RecentAvalanchesContainer initialRegions={initialRegions} variant="queue" />
    </Suspense>
  )
}

export default ObservationsPage
