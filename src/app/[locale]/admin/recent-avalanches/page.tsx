import { Suspense } from 'react'
import { RecentAvalanchesContainer } from '@components/features/admin/RecentAvalanches'
import { Spinner } from '@components/ui'
import fetchActiveRegions from '@data/queries/fetchActiveRegions'

const RecentAvalanchesPage = async () => {
  const initialRegions = await fetchActiveRegions()

  return (
    <Suspense fallback={<Spinner size="lg" />}>
      <RecentAvalanchesContainer initialRegions={initialRegions} />
    </Suspense>
  )
}

export default RecentAvalanchesPage
