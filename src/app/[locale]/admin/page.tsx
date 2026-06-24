import { Suspense } from 'react'
import { AdminDashboard } from '@components/features/admin/Dashboard'
import { Spinner } from '@components/ui'
import fetchActiveRegions from '@data/queries/fetchActiveRegions'

const AdminPage = async () => {
  const initialRegions = await fetchActiveRegions()

  return (
    <Suspense fallback={<Spinner size="lg" />}>
      <AdminDashboard initialRegions={initialRegions} />
    </Suspense>
  )
}

export default AdminPage
