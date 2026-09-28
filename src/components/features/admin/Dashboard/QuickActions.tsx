'use client'

import { Icon } from '@components/icons'
import { usePendingMembersCount } from '@data/hooks/members'
import { usePendingObservationsSummary } from '@data/hooks/recentAvalanches'
import type { Region } from '@domain/types'
import { useTranslations } from 'next-intl'
import { Link } from 'src/i18n/navigation'

import NewForecastButton from './NewForecastButton'

import { cn } from '@/lib/utils'
import { routes } from '@/routes'

export const actionBaseClass =
  'flex w-full items-center gap-2 rounded-md border px-2.5 h-9 text-sm transition-colors'
const actionLinkClass = cn(
  actionBaseClass,
  'border-gray-200 bg-white text-gray-700 hover:bg-gray-50',
)

const CountBadge = ({ count }: { count: number }) => {
  if (count === 0) return null

  return (
    <span className="ml-auto rounded-full bg-blue-500 px-1.5 py-px text-[10px] font-semibold text-white">
      {count}
    </span>
  )
}

const QuickActions = ({ regions }: { regions: Region[] }) => {
  const t = useTranslations()
  const pendingMembersCount = usePendingMembersCount()
  const { total: pendingObservationsCount } = usePendingObservationsSummary()

  return (
    <div className="rounded-xl border border-gray-200 bg-white px-4 py-4">
      <p className="mb-3 text-sm font-semibold text-gray-900">
        {t('admin.dashboard.actions.title')}
      </p>

      <div className="space-y-1.5">
        <NewForecastButton regions={regions} />

        <Link className={actionLinkClass} href={routes.admin.members.root}>
          <Icon icon="users" size="sm" />
          {t('admin.dashboard.actions.memberRequests')}
          <CountBadge count={pendingMembersCount} />
        </Link>

        <Link className={actionLinkClass} href={routes.admin.observations.root}>
          <Icon icon="telescope" size="sm" />
          {t('admin.dashboard.actions.observationsReview')}
          <CountBadge count={pendingObservationsCount} />
        </Link>

        <Link className={actionLinkClass} href={routes.admin.recentAvalanches.create}>
          <Icon icon="triangleAlert" size="sm" />
          {t('admin.dashboard.actions.logAvalanche')}
        </Link>
      </div>
    </div>
  )
}

export default QuickActions
