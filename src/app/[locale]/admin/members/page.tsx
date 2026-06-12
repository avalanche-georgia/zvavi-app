import { Suspense } from 'react'
import { Spinner } from '@components/ui'

import MembersContainer from './MembersContainer'

const MembersPage = () => (
  <Suspense fallback={<Spinner size="lg" />}>
    <MembersContainer />
  </Suspense>
)

export default MembersPage
