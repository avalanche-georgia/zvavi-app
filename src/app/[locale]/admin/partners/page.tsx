import { Suspense } from 'react'
import Loading from '@components/features/admin/shared/Loading'

import PartnersContainer from './PartnersContainer'

const PartnersPage = () => (
  <Suspense fallback={<Loading isPage />}>
    <PartnersContainer />
  </Suspense>
)

export default PartnersPage
