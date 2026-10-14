'use client'

import { ListLoadError, RegionTabBar, useCreateSheetParam } from '@components/features/admin/shared'
import { AdminPageBody } from '@components/layout/admin'
import { usePendingObservationsSummary } from '@data/hooks/recentAvalanches'
import { defaultRegionId } from '@domain/constants'
import type { Region, RegionId } from '@domain/types'
import { Button } from '@ds/primitives'
import { Plus } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'

import { AvalancheCreateSheet } from './AvalancheCreateSheet'
import {
  AvalancheSheet,
  useAvalancheSelection,
  useAvalancheSheetNavigation,
} from './AvalancheSheet'
import {
  type AvalanchesListVariant,
  AvalanchesTable,
  AvalanchesToolbar,
  useAvalanchesListPage,
} from './AvalanchesList'

type RecentAvalanchesContainerProps = {
  initialRegions?: Region[]
  variant: AvalanchesListVariant
}

// Catalog (Recent Avalanches) and moderation queue (Observations): same table,
// records open in a side panel
const RecentAvalanchesContainer = ({ initialRegions, variant }: RecentAvalanchesContainerProps) => {
  const t = useTranslations()
  const searchParams = useSearchParams()
  const regionId = (searchParams.get('regionId') as RegionId) ?? defaultRegionId
  const isQueue = variant === 'queue'

  const page = useAvalanchesListPage(variant, regionId)
  const { query } = page
  const selection = useAvalancheSelection()
  const createSheet = useCreateSheetParam()
  const sheetNavigation = useAvalancheSheetNavigation({
    ids: page.avalanches.map(({ id }) => id),
    onDismiss: selection.dismissAvalanche,
    onShow: selection.showAvalanche,
    selectedId: selection.selectedId,
  })
  const pendingSummary = usePendingObservationsSummary()

  // A failed background refetch keeps the data on screen; the error block is for first loads
  const isLoadFailed = query.isError && !query.data

  const handleRetry = () => void query.refetch()

  return (
    <>
      <RegionTabBar
        counts={isQueue ? pendingSummary.byRegion : undefined}
        initialRegions={initialRegions}
        regionId={regionId}
      >
        {!isQueue && (
          <Button onClick={createSheet.openCreate} size="sm">
            <Plus aria-hidden className="size-4" />
            {t('admin.recentAvalanches.title.create')}
          </Button>
        )}
      </RegionTabBar>

      <AdminPageBody>
        <AvalanchesToolbar page={page} variant={variant} />
        {isLoadFailed ? (
          <ListLoadError onRetry={handleRetry} />
        ) : (
          <AvalanchesTable
            onAvalancheOpen={selection.openAvalanche}
            page={page}
            regionId={regionId}
            variant={variant}
          />
        )}
      </AdminPageBody>

      <AvalancheSheet
        id={selection.selectedId}
        initialMode={selection.initialMode}
        navigation={sheetNavigation.navigation}
        onClose={selection.closeAvalanche}
        // Queue: an approved / rejected / deleted record moves on to the next one
        onRecordLeave={isQueue ? sheetNavigation.advance : undefined}
        onReopen={selection.reopenAvalanche}
      />

      {!isQueue && (
        <AvalancheCreateSheet
          isRequested={createSheet.isCreateOpen}
          onClose={createSheet.closeCreate}
          regionId={regionId}
        />
      )}
    </>
  )
}

export default RecentAvalanchesContainer
