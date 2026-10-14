import { Suspense } from 'react'
import { Spinner } from '@components/ui'

import PartnersContainer from './PartnersContainer'

const PartnersPage = () => (
  <Suspense fallback={<Spinner size="lg" />}>
    <PartnersContainer />
  </Suspense>
)

export default PartnersPage
