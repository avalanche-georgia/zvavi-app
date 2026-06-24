'use client'

import { Icon } from '@components/icons'
import { Skeleton } from '@components/ui'
import type { Region } from '@domain/types'
import { formatDistanceToNow } from 'date-fns'
import { useTranslations } from 'next-intl'

import useActivityEvents from './useActivityEvents'

const activitySkeleton = (
  <div className="space-y-2.5">
    {Array.from({ length: 3 }, (_, index) => (
      <div key={index} className="flex items-start gap-2">
        <Skeleton className="mt-px size-4 rounded-full" />
        <Skeleton className="h-4 flex-1" />
      </div>
    ))}
  </div>
)

type RecentActivityProps = { regions: Region[] }

const RecentActivity = ({ regions }: RecentActivityProps) => {
  const t = useTranslations()
  const { events, isPending } = useActivityEvents(regions)

  if (!isPending && events.length === 0) return null

  return (
    <div className="rounded-xl border border-gray-200 bg-white px-4 py-4">
      <p className="mb-3 text-sm font-semibold text-gray-900">
        {t('admin.dashboard.activity.title')}
      </p>

      {isPending ? (
        activitySkeleton
      ) : (
        <div className="space-y-2.5">
          {events.map((event) => (
            <div
              key={`${event.at.getTime()}-${event.icon}`}
              className="flex items-center gap-2 text-xs text-gray-600"
            >
              <Icon className="mt-px text-gray-400" icon={event.icon} size="sm" />
              <span>
                {event.label}{' '}
                <span className="text-gray-400">
                  · {formatDistanceToNow(event.at, { addSuffix: true })}
                </span>
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default RecentActivity
