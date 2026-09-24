'use client'

import { Tabs } from '@base-ui/react/tabs'
import { useRegionsQuery } from '@data/hooks/regions'
import type { Region, RegionId } from '@domain/types'
import { useRouter, useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'

import { cn } from '@/lib/utils'

type RegionTabsProps = {
  // Optional badge per tab (e.g. items awaiting review); zero shows nothing
  counts?: Partial<Record<RegionId, number>>
  currentRegionId: RegionId
  initialRegions?: Region[]
}

const RegionTabs = ({ counts, currentRegionId, initialRegions }: RegionTabsProps) => {
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
            className={cn(
              'relative rounded-t px-5 pt-1.5 pb-2 text-[15px] font-medium transition-colors',
              'text-gray-500 hover:text-gray-800',
              'data-active:border-primary data-active:text-primary data-active:bg-primary/7',
              'after:bg-primary after:invisible after:absolute after:inset-x-0 after:bottom-0',
              'after:h-0.5 data-active:after:visible',
            )}
            value={region.id}
          >
            {t(`regions.names.${region.id}`)}
            {!!counts?.[region.id] && (
              <span className="ml-2 inline-flex size-5 items-center justify-center rounded-full bg-blue-500 text-xs text-white">
                {counts[region.id]}
              </span>
            )}
          </Tabs.Tab>
        ))}
      </Tabs.List>
    </Tabs.Root>
  )
}

export default RegionTabs
