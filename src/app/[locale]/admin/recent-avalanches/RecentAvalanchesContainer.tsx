'use client'

import {
  RecentAvalanchesFilters,
  RecentAvalanchesTable,
} from '@components/features/admin/RecentAvalanches'
import { Icon } from '@components/icons'
import { ButtonLink } from '@components/shared'
import { useTranslations } from 'next-intl'

import useRecentAvalanchesPage from './useRecentAvalanchesPage'

import { routes } from '@/routes'

const RecentAvalanchesContainer = () => {
  const t = useTranslations()
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

        <ButtonLink href={routes.admin.recentAvalanches.new}>
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
        />
      </div>
    </>
  )
}

export default RecentAvalanchesContainer
