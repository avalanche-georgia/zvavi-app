'use client'

import { LinkPendingIndicator } from '@components/features/admin/shared'
import { usePendingMembersCount } from '@data/hooks/members'
import { usePendingObservationsSummary } from '@data/hooks/recentAvalanches'
import type { Region } from '@domain/types'
import { CountBadge } from '@ds/primitives'
import { Telescope, TriangleAlert, Users } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Link } from 'src/i18n/navigation'

import { actionClasses } from './actionClasses'
import DashboardCard from './DashboardCard'
import NewForecastButton from './NewForecastButton'

import { routes } from '@/routes'

const QuickActions = ({ regions }: { regions: Region[] }) => {
  const t = useTranslations()
  const pendingMembersCount = usePendingMembersCount()
  const { total: pendingObservationsCount } = usePendingObservationsSummary()

  return (
    <DashboardCard title={t('admin.dashboard.actions.title')}>
      <div className="flex flex-col gap-2">
        <NewForecastButton regions={regions} />

        <Link className={actionClasses} href={routes.admin.members.pending}>
          <Users aria-hidden />
          {t('admin.dashboard.actions.memberRequests')}
          <LinkPendingIndicator />
          <CountBadge className="ml-auto" count={pendingMembersCount} />
        </Link>

        <Link className={actionClasses} href={routes.admin.observations.root}>
          <Telescope aria-hidden />
          {t('admin.dashboard.actions.observationsReview')}
          <LinkPendingIndicator />
          <CountBadge className="ml-auto" count={pendingObservationsCount} />
        </Link>

        <Link className={actionClasses} href={routes.admin.recentAvalanches.create}>
          <TriangleAlert aria-hidden />
          {t('admin.dashboard.actions.logAvalanche')}
          <LinkPendingIndicator />
        </Link>
      </div>
    </DashboardCard>
  )
}

export default QuickActions
