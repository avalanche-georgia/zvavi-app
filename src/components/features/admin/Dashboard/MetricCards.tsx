'use client'

import { useMemo } from 'react'
import { useCurrentForecastsPerRegion } from '@data/hooks/forecasts'
import { useMembersQuery } from '@data/hooks/members'
import { useAvalanchesPerRegion, usePendingObservationsSummary } from '@data/hooks/recentAvalanches'
import type { Region } from '@domain/types'
import { subDays } from 'date-fns'
import { useTranslations } from 'next-intl'

import MetricCard from './MetricCard'

import { routes } from '@/routes'

// Four numbers that say what needs attention; each opens the list behind it
const MetricCards = ({ regions }: { regions: Region[] }) => {
  const t = useTranslations()
  const dateFrom = useMemo(() => subDays(new Date(), 7).toISOString(), [])

  const forecastQueries = useCurrentForecastsPerRegion(regions)
  const membersQuery = useMembersQuery()
  const observations = usePendingObservationsSummary()
  const avalancheQueries = useAvalanchesPerRegion(regions, { dateFrom, dateMode: 'created' })

  const publishedCount = forecastQueries.filter((query) => query.data != null).length
  const pendingMembersCount =
    membersQuery.data?.filter((member) => member.status === 'pending').length ?? 0
  const avalancheCount = avalancheQueries.reduce(
    (sum, query) => sum + (query.data?.totalCount ?? 0),
    0,
  )

  return (
    <div className="grid grid-cols-2 gap-3 @4xl:grid-cols-4">
      <MetricCard
        href={routes.admin.forecasts.root}
        isError={forecastQueries.some((query) => query.isError)}
        isPending={forecastQueries.some((query) => query.isPending)}
        label={t('admin.dashboard.metrics.forecastsPublished')}
        note={t('admin.dashboard.metrics.forecastsOf', { total: regions.length })}
        value={publishedCount}
      />
      <MetricCard
        href={routes.admin.members.pending}
        isError={membersQuery.isError}
        isPending={membersQuery.isPending}
        label={t('admin.dashboard.metrics.pendingMembers')}
        value={pendingMembersCount}
      />
      <MetricCard
        href={routes.admin.observations.root}
        isError={observations.isError}
        isPending={observations.isPending}
        label={t('admin.dashboard.metrics.pendingObservations')}
        value={observations.total}
      />
      <MetricCard
        href={routes.admin.recentAvalanches.root}
        isError={avalancheQueries.some((query) => query.isError)}
        isPending={avalancheQueries.some((query) => query.isPending)}
        label={t('admin.dashboard.metrics.avalanchesWeek')}
        value={avalancheCount}
      />
    </div>
  )
}

export default MetricCards
