'use client'

import { Icon } from '@components/icons'
import { usePendingMembersCount } from '@data/hooks/members'
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

const QuickActions = ({ regions }: { regions: Region[] }) => {
  const t = useTranslations()
  const pendingCount = usePendingMembersCount()

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
          {pendingCount > 0 && (
            <span className="ml-auto rounded-full bg-blue-500 px-1.5 py-px text-[10px] font-semibold text-white">
              {pendingCount}
            </span>
          )}
        </Link>

        <Link className={actionLinkClass} href={routes.admin.recentAvalanches.new}>
          <Icon icon="triangleAlert" size="sm" />
          {t('admin.dashboard.actions.logAvalanche')}
        </Link>
      </div>
    </div>
  )
}

export default QuickActions
