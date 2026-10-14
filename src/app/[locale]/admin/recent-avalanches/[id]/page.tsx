'use client'

import { AvalancheViewPage } from '@components/features/admin/RecentAvalanches'
import { Loading, RecordNotFound } from '@components/features/admin/shared'
import { AdminPageBody } from '@components/layout/admin'
import { LoadError } from '@components/shared'
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
    return <Loading isPage />
  }

  const handleRetry = () => void refetch()

  return (
    <AdminPageBody className="max-w-2xl">
      {isError && !avalanche && (
        <div className="rounded-card border-rule bg-surface border">
          <LoadError onRetry={handleRetry} />
        </div>
      )}
      {!isError && !avalanche && (
        <RecordNotFound
          backHref={routes.admin.recentAvalanches.root}
          message={t('admin.recentAvalanches.notFound')}
        />
      )}
      {avalanche && <AvalancheViewPage avalanche={avalanche} />}
    </AdminPageBody>
  )
}

export default RecentAvalancheViewPage
