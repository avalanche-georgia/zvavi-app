'use client'

import { Icon } from '@components/icons'
import { ButtonLink } from '@components/shared'
import type { RegionId } from '@domain/types'
import { useTranslations } from 'next-intl'

import CatalogFilters from './CatalogFilters'
import RecentAvalanchesFilters from './RecentAvalanchesFilters'
import type { AvalancheTableVariant } from './RecentAvalanchesTable'
import type useRecentAvalanchesPage from './useRecentAvalanchesPage'

import { routes } from '@/routes'

type ListToolbarProps = {
  page: ReturnType<typeof useRecentAvalanchesPage>
  regionId: RegionId
  variant: AvalancheTableVariant
}

// Filters row above the table; the catalog adds source / status and "Create"
const ListToolbar = ({ page, regionId, variant }: ListToolbarProps) => {
  const t = useTranslations()
  const isQueue = variant === 'queue'

  return (
    <div className="flex items-center justify-between gap-4 border-b bg-white px-4 py-3 md:px-6">
      <RecentAvalanchesFilters
        dateFrom={page.dateFrom}
        dateMode={page.dateMode}
        dateTo={page.dateTo}
        hasOtherFilters={!isQueue && (page.source !== null || page.status !== null)}
        onDateFromChange={page.onDateFromChange}
        onDateModeChange={page.onDateModeChange}
        onDateToChange={page.onDateToChange}
        onReset={page.onFiltersReset}
      >
        {!isQueue && (
          <CatalogFilters
            onSourceChange={page.onSourceChange}
            onStatusChange={page.onStatusChange}
            source={page.source}
            status={page.status}
          />
        )}
      </RecentAvalanchesFilters>

      {!isQueue && (
        <ButtonLink
          className="shrink-0 whitespace-nowrap"
          href={routes.admin.recentAvalanches.newInRegion(regionId)}
        >
          <Icon icon="plus" size="sm" />
          {t('admin.recentAvalanches.title.create')}
        </ButtonLink>
      )}
    </div>
  )
}

export default ListToolbar
