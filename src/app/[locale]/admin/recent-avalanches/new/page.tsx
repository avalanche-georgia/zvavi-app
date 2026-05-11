'use client'

import { RecentAvalancheForm } from '@components/features/admin/RecentAvalanches'
import { defaultRegionId } from '@domain/constants'
import type { RegionId } from '@domain/types'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'src/i18n/navigation'

import { routes } from '@/routes'

const NewRecentAvalanchePage = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const regionId = (searchParams.get('regionId') as RegionId) ?? defaultRegionId

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

export default NewRecentAvalanchePage
