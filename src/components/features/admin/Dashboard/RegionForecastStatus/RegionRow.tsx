import { LinkPendingIndicator } from '@components/features/admin/shared'
import { useGetCurrentForecast } from '@data/hooks/forecasts'
import type { RegionId } from '@domain/types'
import { Skeleton, StatusPill } from '@ds/primitives'
import { MapPin } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Link } from 'src/i18n/navigation'

import useRegionStatus from './useRegionStatus'

import { routes } from '@/routes'

// Region name (opens its forecasts) + the state of its public forecast
const RegionRow = ({ regionId }: { regionId: RegionId }) => {
  const t = useTranslations()
  const { data: currentForecast, isPending } = useGetCurrentForecast({ isShort: true, regionId })
  const { label, tone } = useRegionStatus(currentForecast)

  return (
    <li className="border-rule flex min-h-12 flex-wrap items-center justify-between gap-x-3 gap-y-1 border-b py-2 last:border-b-0">
      <Link
        className="focus-ring text-copy text-ink hover:text-accent rounded-badge flex items-center gap-1.5 font-medium hover:underline"
        href={routes.admin.forecasts.listByRegion(regionId)}
      >
        <MapPin aria-hidden className="text-muted size-4" />
        {t(`regions.names.${regionId}`)}
        <LinkPendingIndicator />
      </Link>

      {isPending ? <Skeleton className="h-6 w-36" /> : <StatusPill tone={tone}>{label}</StatusPill>}
    </li>
  )
}

export default RegionRow
