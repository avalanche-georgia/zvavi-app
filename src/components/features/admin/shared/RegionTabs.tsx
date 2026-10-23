'use client'

import { Tabs } from '@base-ui/react/tabs'
import { useRegionsQuery } from '@data/hooks/regions'
import type { Region, RegionId } from '@domain/types'
import { CountBadge } from '@ds/primitives'
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
    <Tabs.Root onValueChange={handleValueChange} value={currentRegionId}>
      <Tabs.List className="flex items-end pt-1">
        {regions.map((region) => (
          <Tabs.Tab
            key={region.id}
            className={cn(
              'text-copy-lg text-muted rounded-t-badge relative px-5 pt-1.5 pb-2 font-semibold transition-colors',
              'hover:text-ink data-active:bg-primary-soft data-active:text-primary-ink',
              'after:bg-primary after:invisible after:absolute after:inset-x-0 after:bottom-0',
              'after:h-0.5 data-active:after:visible',
            )}
            value={region.id}
          >
            {t(`regions.names.${region.id}`)}
            <CountBadge className="ml-2" count={counts?.[region.id]} />
          </Tabs.Tab>
        ))}
      </Tabs.List>
    </Tabs.Root>
  )
}

export default RegionTabs
