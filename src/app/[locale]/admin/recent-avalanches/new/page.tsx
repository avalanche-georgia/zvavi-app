'use client'

import { RecentAvalancheForm } from '@components/features/admin/RecentAvalanches'
import { RequireRegionId } from '@components/shared'
import type { RegionId } from '@domain/types'
import { useRouter } from 'src/i18n/navigation'

import { routes } from '@/routes'

const NewRecentAvalancheContent = ({ regionId }: { regionId: RegionId }) => {
  const router = useRouter()

  const handleBack = () => {
    router.push(routes.admin.recentAvalanches.listByRegion(regionId))
  }

  return (
    <div className="p-4 md:p-6">
      <RecentAvalancheForm
        mode="create"
        onCancel={handleBack}
        onSuccess={handleBack}
        regionId={regionId}
      />
    </div>
  )
}

const NewRecentAvalanchePage = () => (
  <RequireRegionId fallbackRoute={routes.admin.recentAvalanches.root}>
    {(regionId) => <NewRecentAvalancheContent regionId={regionId} />}
  </RequireRegionId>
)

export default NewRecentAvalanchePage
