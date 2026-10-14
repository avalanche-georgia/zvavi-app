'use client'

import { useTransition } from 'react'
import { RegionTabBar } from '@components/features/admin/shared'
import type { Region, RegionId } from '@domain/types'
import { Button } from '@ds/primitives'
import { Plus } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'src/i18n/navigation'

import { routes } from '@/routes'

type ForecastsTabBarProps = { initialRegions?: Region[]; regionId: RegionId }

// Region tabs + the page's only "Create forecast" entry point
const ForecastsTabBar = ({ initialRegions, regionId }: ForecastsTabBarProps) => {
  const t = useTranslations()
  const router = useRouter()
  const [isNavigating, startNavigation] = useTransition()

  const handleCreate = () =>
    startNavigation(() => router.push(routes.admin.forecasts.newInRegion(regionId)))

  return (
    <RegionTabBar initialRegions={initialRegions} regionId={regionId}>
      <Button isBusy={isNavigating} onClick={handleCreate} size="sm">
        <Plus aria-hidden className="size-4" />
        {t('admin.forecast.title.create')}
      </Button>
    </RegionTabBar>
  )
}

export default ForecastsTabBar
