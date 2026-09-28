import { Suspense } from 'react'
import { Spinner } from '@components/ui'
import fetchActiveRegions from '@data/queries/fetchActiveRegions'

import RecentAvalanchesContainer from './RecentAvalanchesContainer'

const RecentAvalanchesPage = async () => {
  const initialRegions = await fetchActiveRegions()

  return (
    <Suspense fallback={<Spinner size="lg" />}>
      <RecentAvalanchesContainer initialRegions={initialRegions} />
    </Suspense>
  )
}

export default RecentAvalanchesPage
