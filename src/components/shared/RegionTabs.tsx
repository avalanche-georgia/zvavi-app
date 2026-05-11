'use client'

import { Tabs } from '@base-ui/react/tabs'
import { useRegionsQuery } from '@data/hooks/regions'
import type { Region, RegionId } from '@domain/types'
import clsx from 'clsx'
import { useRouter, useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'

type RegionTabsProps = {
  currentRegionId: RegionId
  initialRegions?: Region[]
}

const RegionTabs = ({ currentRegionId, initialRegions }: RegionTabsProps) => {
  const t = useTranslations()
  const router = useRouter()
  const searchParams = useSearchParams()
  const { data: regions = [] } = useRegionsQuery(initialRegions)

  const handleValueChange = (value: RegionId | null) => {
    if (!value) return

    const params = new URLSearchParams(searchParams.toString())

    params.set('regionId', value)
    params.delete('page')
    router.replace(`?${params.toString()}`)
  }

  return (
    <Tabs.Root
      onValueChange={(value) => handleValueChange(value as RegionId | null)}
      value={currentRegionId}
    >
      <Tabs.List className="flex items-end pt-1">
        {regions.map((region) => (
          <Tabs.Tab
            key={region.id}
            className={clsx(
              'relative rounded-t px-5 pt-1.5 pb-2 text-[15px] font-medium transition-colors',
              'text-gray-500 hover:text-gray-800',
              'data-active:border-primary data-active:text-primary data-active:bg-primary/7',
              'after:bg-primary after:invisible after:absolute after:inset-x-0 after:bottom-0',
              'after:h-0.5 data-active:after:visible',
            )}
            value={region.id}
          >
            {t(`regions.names.${region.id}`)}
          </Tabs.Tab>
        ))}
      </Tabs.List>
    </Tabs.Root>
  )
}

export default RegionTabs
