'use client'

import { useTransition } from 'react'
import { RegionTabs } from '@components/shared'
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
    // Tabs sit on the bottom rule; the button gets its own vertical breathing room
    <div className="border-rule bg-surface flex items-end justify-between gap-4 border-b px-4 md:px-6">
      <RegionTabs currentRegionId={regionId} initialRegions={initialRegions} />
      <Button className="my-2 self-center" isBusy={isNavigating} onClick={handleCreate} size="sm">
        <Plus aria-hidden className="size-4" />
        {t('admin.forecast.title.create')}
      </Button>
    </div>
  )
}

export default ForecastsTabBar
