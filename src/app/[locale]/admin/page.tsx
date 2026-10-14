import { Suspense } from 'react'
import { AdminDashboard } from '@components/features/admin/Dashboard'
import Loading from '@components/features/admin/shared/Loading'
import fetchActiveRegions from '@data/queries/fetchActiveRegions'

const AdminPage = async () => {
  const initialRegions = await fetchActiveRegions()

  return (
    <Suspense fallback={<Loading isPage />}>
      <AdminDashboard initialRegions={initialRegions} />
    </Suspense>
  )
}

export default AdminPage
