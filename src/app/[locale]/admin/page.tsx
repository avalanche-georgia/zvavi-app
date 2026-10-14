import { AdminDashboard } from '@components/features/admin/Dashboard'
import AdminPageBoundary from '@components/features/admin/shared/AdminPageBoundary'
import fetchActiveRegions from '@data/queries/fetchActiveRegions'

const AdminPage = async () => {
  const initialRegions = await fetchActiveRegions()

  return (
    <AdminPageBoundary>
      <AdminDashboard initialRegions={initialRegions} />
    </AdminPageBoundary>
  )
}

export default AdminPage
