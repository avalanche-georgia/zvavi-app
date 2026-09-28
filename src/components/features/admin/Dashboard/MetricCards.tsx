'use client'

import { useMemo } from 'react'
import { useCurrentForecastsPerRegion } from '@data/hooks/forecasts'
import { useMembersQuery } from '@data/hooks/members'
import { useAvalanchesPerRegion, usePendingObservationsSummary } from '@data/hooks/recentAvalanches'
import type { Region } from '@domain/types'
import { subDays } from 'date-fns'
import { useTranslations } from 'next-intl'

import MetricCard from './MetricCard'

const MetricCards = ({ regions }: { regions: Region[] }) => {
  const t = useTranslations()
  const dateFrom = useMemo(() => subDays(new Date(), 7).toISOString(), [])

  const forecastQueries = useCurrentForecastsPerRegion(regions)
  const isForecastPending = forecastQueries.some((query) => query.isPending)
  const isForecastError = forecastQueries.some((query) => query.isError)
  const publishedCount = forecastQueries.filter((query) => query.data != null).length

  const { data: members, isError: isMembersError, isPending: isMembersPending } = useMembersQuery()
  const pendingCount = members?.filter((member) => member.status === 'pending').length ?? 0

  const {
    isError: isObservationsError,
    isPending: isObservationsPending,
    total: pendingObservationsCount,
  } = usePendingObservationsSummary()

  const avalancheQueries = useAvalanchesPerRegion(regions, { dateFrom, dateMode: 'created' })
  const isAvalanchePending = avalancheQueries.some((query) => query.isPending)
  const isAvalancheError = avalancheQueries.some((query) => query.isError)
  const avalancheCount = avalancheQueries.reduce(
    (sum, query) => sum + (query.data?.totalCount ?? 0),
    0,
  )

  return (
    <div className="mb-3.5 grid grid-cols-2 gap-3 lg:grid-cols-4">
      <MetricCard
        isError={isForecastError}
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

      <MetricCard
        isError={isMembersError}
        isPending={isMembersPending}
        label={t('admin.dashboard.metrics.pendingMembers')}
      >
        <span className="text-2xl font-semibold text-gray-900">{pendingCount}</span>
      </MetricCard>

      <MetricCard
        isError={isObservationsError}
        isPending={isObservationsPending}
        label={t('admin.dashboard.metrics.pendingObservations')}
      >
        <span className="text-2xl font-semibold text-gray-900">{pendingObservationsCount}</span>
      </MetricCard>

      <MetricCard
        isError={isAvalancheError}
        isPending={isAvalanchePending}
        label={t('admin.dashboard.metrics.avalanchesWeek')}
      >
        <span className="text-2xl font-semibold text-gray-900">{avalancheCount}</span>
      </MetricCard>
    </div>
  )
}

export default MetricCards
