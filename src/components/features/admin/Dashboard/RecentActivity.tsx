'use client'

import { Icon } from '@components/icons'
import type { Region } from '@domain/types'
import { Skeleton } from '@ds/primitives'
import { formatDistanceToNow } from 'date-fns'
import { useLocale, useTranslations } from 'next-intl'

import DashboardCard from './DashboardCard'
import useActivityEvents from './useActivityEvents'

import { getDateFnsLocale } from '@/lib/dateFnsLocale'

const skeletonRows = [0, 1, 2]

const activitySkeleton = (
  <div className="flex flex-col gap-2.5">
    {skeletonRows.map((row) => (
      <div key={row} className="flex items-center gap-2">
        <Skeleton className="size-4 rounded-full" />
        <Skeleton className="h-4 flex-1" />
      </div>
    ))}
  </div>
)

// The latest thing that happened in each area — hidden when nothing has
const RecentActivity = ({ regions }: { regions: Region[] }) => {
  const t = useTranslations()
  const locale = getDateFnsLocale(useLocale())
  const { events, isPending } = useActivityEvents(regions)

  if (!isPending && events.length === 0) return null

  return (
    <DashboardCard title={t('admin.dashboard.activity.title')}>
      {isPending ? (
        activitySkeleton
      ) : (
        <ul className="flex flex-col gap-2.5">
          {events.map(({ at, icon, label }) => (
            <li
              key={`${at.getTime()}-${icon}`}
              className="text-copy-sm text-body flex items-start gap-2"
            >
              <Icon className="text-muted mt-0.5 shrink-0" icon={icon} size="sm" />
              <span>
                {label}
                <span className="text-muted">
                  {` · ${formatDistanceToNow(at, { addSuffix: true, locale })}`}
                </span>
              </span>
            </li>
          ))}
        </ul>
      )}
    </DashboardCard>
  )
}

export default RecentActivity
