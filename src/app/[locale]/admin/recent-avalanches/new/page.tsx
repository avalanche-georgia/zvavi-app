'use client'

import { RecentAvalancheForm } from '@components/features/admin/RecentAvalanches'
import { useRouter } from 'src/i18n/navigation'

import { routes } from '@/routes'

const NewRecentAvalanchePage = () => {
  const router = useRouter()

  const handleBack = () => {
    router.push(routes.admin.recentAvalanches.root)
  }

  return (
    <div className="p-4 md:p-6">
      <RecentAvalancheForm mode="create" onCancel={handleBack} onSuccess={handleBack} />
    </div>
  )
}

export default NewRecentAvalanchePage
