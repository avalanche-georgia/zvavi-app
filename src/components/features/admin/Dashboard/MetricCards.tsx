'use client'

import { useMemo } from 'react'
import { Skeleton } from '@components/ui'
import { useCurrentForecastsPerRegion } from '@data/hooks/forecasts'
import { useMembersQuery } from '@data/hooks/members'
import { useAvalanchesPerRegion } from '@data/hooks/recentAvalanches'
import type { Region } from '@domain/types'
import { subDays } from 'date-fns'
import { useTranslations } from 'next-intl'

type MetricCardProps = {
  children: React.ReactNode
  isPending: boolean
  label: string
}

const MetricCard = ({ children, isPending, label }: MetricCardProps) => (
  <div className="rounded-lg border bg-gray-100 px-4 py-3.5">
    <p className="mb-1.5 text-xs tracking-wide text-gray-500 uppercase">{label}</p>
    {isPending ? <Skeleton className="h-8 w-10" /> : children}
  </div>
)

const MetricCards = ({ regions }: { regions: Region[] }) => {
  const t = useTranslations()
  const dateFrom = useMemo(() => subDays(new Date(), 7).toISOString(), [])

  const forecastQueries = useCurrentForecastsPerRegion(regions)
  const isForecastPending = forecastQueries.some((query) => query.isPending)
  const publishedCount = forecastQueries.filter((query) => query.data != null).length

  const { data: members, isPending: isMembersPending } = useMembersQuery()
  const pendingCount = members?.filter((member) => member.status === 'pending').length ?? 0

  const avalancheQueries = useAvalanchesPerRegion(regions, { dateFrom, dateMode: 'created' })
  const isAvalanchePending = avalancheQueries.some((query) => query.isPending)
  const avalancheCount = avalancheQueries.reduce(
    (sum, query) => sum + (query.data?.totalCount ?? 0),
    0,
  )

  return (
    <div className="mb-3.5 grid grid-cols-3 gap-3">
      <MetricCard
        isPending={isForecastPending}
        label={t('admin.dashboard.metrics.forecastsPublished')}
      >
        <div className="flex items-baseline gap-1.5">
          <span className="text-2xl font-semibold text-gray-900">{publishedCount}</span>
          <span className="text-sm text-gray-400">
            {t('admin.dashboard.metrics.forecastsOf', { total: regions.length })}
          </span>
        </div>
      </MetricCard>

      <MetricCard isPending={isMembersPending} label={t('admin.dashboard.metrics.pendingMembers')}>
        <span className="text-2xl font-semibold text-gray-900">{pendingCount}</span>
      </MetricCard>

      <MetricCard
        isPending={isAvalanchePending}
        label={t('admin.dashboard.metrics.avalanchesWeek')}
      >
        <span className="text-2xl font-semibold text-gray-900">{avalancheCount}</span>
      </MetricCard>
    </div>
  )
}

export default MetricCards
