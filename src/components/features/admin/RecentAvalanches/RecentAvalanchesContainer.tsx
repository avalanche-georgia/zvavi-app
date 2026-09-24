'use client'

import { RegionTabs } from '@components/shared'
import { usePendingObservationsCounts } from '@data/hooks/recentAvalanches'
import { defaultRegionId } from '@domain/constants'
import type { Region, RegionId } from '@domain/types'
import { useSearchParams } from 'next/navigation'

import {
  AvalancheSheet,
  useAvalancheSelection,
  useAvalancheSheetNavigation,
} from './AvalancheSheet'
import ListToolbar from './ListToolbar'
import { type AvalancheTableVariant, RecentAvalanchesTable } from './RecentAvalanchesTable'
import useRecentAvalanchesPage from './useRecentAvalanchesPage'

type RecentAvalanchesContainerProps = {
  initialRegions?: Region[]
  variant: AvalancheTableVariant
}

// Catalog (Recent Avalanches) and moderation queue (Observations): same table,
// records open in a side panel
const RecentAvalanchesContainer = ({ initialRegions, variant }: RecentAvalanchesContainerProps) => {
  const searchParams = useSearchParams()
  const regionId = (searchParams.get('regionId') as RegionId) ?? defaultRegionId
  const isQueue = variant === 'queue'

  const page = useRecentAvalanchesPage(variant)
  const selection = useAvalancheSelection()
  const sheetNavigation = useAvalancheSheetNavigation({
    ids: page.avalanches.map(({ id }) => id),
    onDismiss: selection.dismissAvalanche,
    onShow: selection.showAvalanche,
    selectedId: selection.selectedId,
  })
  const pendingCounts = usePendingObservationsCounts()

  return (
    <>
      <div className="flex items-center border-b bg-white px-4 md:px-6">
        <RegionTabs
          counts={isQueue ? pendingCounts.byRegion : undefined}
          currentRegionId={regionId}
          initialRegions={initialRegions}
        />
      </div>

      <ListToolbar page={page} regionId={regionId} variant={variant} />

      <div className="p-4 md:p-6">
        <RecentAvalanchesTable
          avalanches={page.avalanches}
          grandTotal={page.grandTotal}
          isPending={page.isPending}
          onAvalancheOpen={selection.openAvalanche}
          paginationProps={{
            currentPage: page.page,
            onPageChange: page.onPageChange,
            totalPages: page.totalPages,
          }}
          regionId={regionId}
          variant={variant}
        />
      </div>

      <AvalancheSheet
        id={selection.selectedId}
        initialMode={selection.initialMode}
        navigation={sheetNavigation.navigation}
        onClose={selection.closeAvalanche}
        // Queue: an approved / rejected / deleted record moves on to the next one
        onRecordLeave={isQueue ? sheetNavigation.advance : undefined}
        onReopen={selection.reopenAvalanche}
      />
    </>
  )
}

export default RecentAvalanchesContainer
