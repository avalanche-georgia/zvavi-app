'use client'

import {
  RecentAvalanchesFilters,
  RecentAvalanchesTable,
} from '@components/features/admin/RecentAvalanches'
import { Icon } from '@components/icons'
import { ButtonLink, RegionTabs } from '@components/shared'
import { defaultRegionId } from '@domain/constants'
import type { Region, RegionId } from '@domain/types'
import { useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'

import useRecentAvalanchesPage from './useRecentAvalanchesPage'

import { routes } from '@/routes'

const RecentAvalanchesContainer = ({ initialRegions }: { initialRegions?: Region[] }) => {
  const t = useTranslations()
  const searchParams = useSearchParams()
  const regionId = (searchParams.get('regionId') as RegionId) ?? defaultRegionId

  const {
    avalanches,
    dateFrom,
    dateMode,
    dateTo,
    grandTotal,
    isPending,
    onDateFromChange,
    onDateModeChange,
    onDateToChange,
    onFiltersReset,
    onPageChange,
    page,
    totalPages,
  } = useRecentAvalanchesPage()

  return (
    <>
      <div className="flex items-center border-b bg-white px-4 md:px-6">
        <RegionTabs currentRegionId={regionId} initialRegions={initialRegions} />
      </div>

      <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b bg-white px-4 py-3 md:px-6">
        <RecentAvalanchesFilters
          dateFrom={dateFrom}
          dateMode={dateMode}
          dateTo={dateTo}
          onDateFromChange={onDateFromChange}
          onDateModeChange={onDateModeChange}
          onDateToChange={onDateToChange}
          onReset={onFiltersReset}
        />

        <ButtonLink href={routes.admin.recentAvalanches.newInRegion(regionId)}>
          <Icon icon="plus" size="sm" />
          {t('admin.recentAvalanches.title.create')}
        </ButtonLink>
      </div>

      <div className="p-4 md:p-6">
        <RecentAvalanchesTable
          avalanches={avalanches}
          grandTotal={grandTotal}
          isPending={isPending}
          paginationProps={{
            currentPage: page,
            onPageChange,
            totalPages,
          }}
          regionId={regionId}
        />
      </div>
    </>
  )
}

export default RecentAvalanchesContainer
