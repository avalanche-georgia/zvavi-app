'use client'

import { RecentAvalancheForm } from '@components/features/admin/RecentAvalanches'
import { useRouter } from 'src/i18n/navigation'

import { routes } from '@/routes'

const NewRecentAvalanchePage = () => {
  const router = useRouter()

  const handleBack = () => {
    router.push(routes.admin.recentAvalanches.root)
  }

  return <RecentAvalancheForm mode="create" onCancel={handleBack} onSuccess={handleBack} />
}

export default NewRecentAvalanchePage
