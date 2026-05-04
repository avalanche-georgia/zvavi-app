'use client'

import { RecentAvalancheForm } from '@components/features/admin/RecentAvalanches'
import { ButtonLink } from '@components/shared'
import { Spinner } from '@components/ui'
import { useRecentAvalancheQuery } from '@data/hooks/recentAvalanches'
import { useParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useRouter } from 'src/i18n/navigation'

import { routes } from '@/routes'

const EditRecentAvalanchePage = () => {
  const t = useTranslations()
  const router = useRouter()
  const params = useParams()

  const id = Number(params.id)
  const isValidId = id > 0 && !Number.isNaN(id)

  const { data: avalanche, isPending } = useRecentAvalancheQuery({ enabled: isValidId, id })

  const handleBack = () => {
    router.push(routes.admin.recentAvalanches.root)
  }

  if (isValidId && isPending) {
    return (
      <div className="relative flex h-full items-center justify-center py-12">
        <Spinner size="lg" />
      </div>
    )
  }

  if (!isValidId || !avalanche?.id) {
    return (
      <div className="p-4 md:p-6">
        <div className="flex flex-col items-center gap-4 rounded-lg bg-white py-16 text-center shadow-sm">
          <p className="text-gray-500">{t('admin.recentAvalanches.notFound')}</p>
          <ButtonLink href={routes.admin.recentAvalanches.root}>
            {t('common.actions.backToList')}
          </ButtonLink>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 md:p-6">
      <RecentAvalancheForm
        avalanche={avalanche as typeof avalanche & { id: number }}
        mode="edit"
        onCancel={handleBack}
        onSuccess={handleBack}
      />
    </div>
  )
}

export default EditRecentAvalanchePage
