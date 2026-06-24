import { Icon } from '@components/icons'
import { Skeleton } from '@components/ui'
import { useGetCurrentForecast } from '@data/hooks/forecasts'
import type { RegionId } from '@domain/types'
import { useTranslations } from 'next-intl'

import { useStatusBadge } from './useStatusBadge'

import { cn } from '@/lib/utils'

const RegionRow = ({ regionId }: { regionId: RegionId }) => {
  const t = useTranslations()
  const { data: currentForecast, isPending } = useGetCurrentForecast({ isShort: true, regionId })
  const badge = useStatusBadge(currentForecast)

  return (
    <div className="mb-1.5 flex items-center justify-between rounded-md border border-gray-100 px-2.5 py-2 last:mb-0">
      <span className="flex items-center gap-1.5 text-sm text-gray-700">
        <Icon icon="mapPin" size="sm" />
        {t(`regions.names.${regionId}`)}
      </span>

      {isPending ? (
        <Skeleton className="h-5 w-28" />
      ) : (
        <span className={cn('rounded-full px-2.5 py-0.5 text-sm', badge.className)}>
          {badge.label}
        </span>
      )}
    </div>
  )
}

export default RegionRow
