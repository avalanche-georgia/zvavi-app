import { RecentAvalanchesContainer } from '@components/features/admin/RecentAvalanches'
import AdminPageBoundary from '@components/features/admin/shared/AdminPageBoundary'
import fetchActiveRegions from '@data/queries/fetchActiveRegions'

const RecentAvalanchesPage = async () => {
  const initialRegions = await fetchActiveRegions()

  return (
    <AdminPageBoundary>
      <RecentAvalanchesContainer initialRegions={initialRegions} variant="catalog" />
    </AdminPageBoundary>
  )
}

export default RecentAvalanchesPage
