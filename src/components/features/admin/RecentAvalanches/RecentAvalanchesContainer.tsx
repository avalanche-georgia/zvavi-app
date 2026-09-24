'use client'

import { Icon } from '@components/icons'
import { ButtonLink, RegionTabs } from '@components/shared'
import { usePendingObservationsCounts } from '@data/hooks/recentAvalanches'
import { defaultRegionId } from '@domain/constants'
import type { Region, RegionId } from '@domain/types'
import { useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'

import { AvalancheSheet, useAvalancheSelection } from './AvalancheSheet'
import RecentAvalanchesFilters from './RecentAvalanchesFilters'
import { type AvalancheTableVariant, RecentAvalanchesTable } from './RecentAvalanchesTable'
import useRecentAvalanchesPage from './useRecentAvalanchesPage'

import { routes } from '@/routes'

type RecentAvalanchesContainerProps = {
  initialRegions?: Region[]
  variant: AvalancheTableVariant
}

// Catalog (Recent Avalanches) and moderation queue (Observations): same table,
// records open in a side panel
const RecentAvalanchesContainer = ({ initialRegions, variant }: RecentAvalanchesContainerProps) => {
  const t = useTranslations()
  const searchParams = useSearchParams()
  const regionId = (searchParams.get('regionId') as RegionId) ?? defaultRegionId
  const isQueue = variant === 'queue'

  const page = useRecentAvalanchesPage(variant)
  const selection = useAvalancheSelection()
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

      <div className="flex items-center justify-between gap-4 border-b bg-white px-4 py-3 md:px-6">
        <RecentAvalanchesFilters
          dateFrom={page.dateFrom}
          dateMode={page.dateMode}
          dateTo={page.dateTo}
          onDateFromChange={page.onDateFromChange}
          onDateModeChange={page.onDateModeChange}
          onDateToChange={page.onDateToChange}
          onReset={page.onFiltersReset}
        />

        {!isQueue && (
          <ButtonLink href={routes.admin.recentAvalanches.newInRegion(regionId)}>
            <Icon icon="plus" size="sm" />
            {t('admin.recentAvalanches.title.create')}
          </ButtonLink>
        )}
      </div>

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
        onClose={selection.closeAvalanche}
        onReopen={selection.reopenAvalanche}
        onStatusChangeClose={isQueue ? selection.dismissAvalanche : undefined}
      />
    </>
  )
}

export default RecentAvalanchesContainer
