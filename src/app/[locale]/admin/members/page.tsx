import { Suspense } from 'react'
import Loading from '@components/features/admin/shared/Loading'

import MembersContainer from './MembersContainer'

const MembersPage = () => (
  <Suspense fallback={<Loading isPage />}>
    <MembersContainer />
  </Suspense>
)

export default MembersPage
