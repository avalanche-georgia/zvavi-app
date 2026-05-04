'use client'

import { RecentAvalancheForm } from '@components/features/admin/RecentAvalanches/RecentAvalancheForm'
import { Spinner } from '@components/ui'
import { useRecentAvalancheQuery } from '@data/hooks/recentAvalanches'
import { useParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useRouter } from 'src/i18n/navigation'

import { routes } from '@/routes'

const NotFound = () => {
  const t = useTranslations()

  return (
    <div className="rounded-lg bg-white p-6 text-center shadow-sm">
      <p className="text-gray-600">{t('admin.recentAvalanches.title.list')}</p>
    </div>
  )
}

const EditRecentAvalanchePage = () => {
  const router = useRouter()
  const params = useParams()

  const id = Number(params.id)

  const { data: avalanche, isPending } = useRecentAvalancheQuery(id)

  const handleBack = () => {
    router.push(routes.admin.recentAvalanches.root)
  }

  if (!id || Number.isNaN(id)) return <NotFound />

  if (isPending) {
    return (
      <div className="flex items-center justify-center py-12">
        <Spinner />
      </div>
    )
  }

  if (!avalanche || !avalanche.id) return <NotFound />

  return (
    <RecentAvalancheForm
      avalanche={avalanche as typeof avalanche & { id: number }}
      onCancel={handleBack}
      onSuccess={handleBack}
    />
  )
}

export default EditRecentAvalanchePage
