'use client'

import { AvalancheViewPage, LoadError } from '@components/features/admin/RecentAvalanches'
import { ButtonLink } from '@components/shared'
import { Spinner } from '@components/ui'
import { useRecentAvalancheQuery } from '@data/hooks/recentAvalanches'
import { useParams } from 'next/navigation'
import { useTranslations } from 'next-intl'

import { routes } from '@/routes'

const RecentAvalancheViewPage = () => {
  const t = useTranslations()
  const params = useParams()

  const id = Number(params.id)
  const isValidId = id > 0 && !Number.isNaN(id)

  const {
    data: avalanche,
    isError,
    isPending,
    refetch,
  } = useRecentAvalancheQuery({ enabled: isValidId, id })

  if (isValidId && isPending) {
    return (
      <div className="relative flex h-full items-center justify-center py-12">
        <Spinner size="lg" />
      </div>
    )
  }

  if (isValidId && isError) {
    return (
      <div className="p-4 md:p-6">
        <div className="rounded-lg bg-white shadow-sm">
          <LoadError onRetry={refetch} />
        </div>
      </div>
    )
  }

  if (!isValidId || !avalanche) {
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
      <AvalancheViewPage avalanche={avalanche} />
    </div>
  )
}

export default RecentAvalancheViewPage
