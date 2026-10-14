import AdminPageBoundary from '@components/features/admin/shared/AdminPageBoundary'
import fetchActiveRegions from '@data/queries/fetchActiveRegions'

import ForecastsContainer from './ForecastsContainer'

const ForecastsPage = async () => {
  const initialRegions = await fetchActiveRegions()

  return (
    <AdminPageBoundary>
      <ForecastsContainer initialRegions={initialRegions} />
    </AdminPageBoundary>
  )
}

export default ForecastsPage
