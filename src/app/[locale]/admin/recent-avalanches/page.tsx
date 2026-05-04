import { Suspense } from 'react'
import { Spinner } from '@components/ui'

import RecentAvalanchesContainer from './RecentAvalanchesContainer'

const RecentAvalanchesPage = () => (
  <Suspense fallback={<Spinner size="lg" />}>
    <RecentAvalanchesContainer />
  </Suspense>
)

export default RecentAvalanchesPage
