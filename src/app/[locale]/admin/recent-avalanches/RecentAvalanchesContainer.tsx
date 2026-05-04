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
      <ButtonLink className="mb-4 ml-auto" href={routes.admin.recentAvalanches.new}>
        <Icon icon="plus" size="sm" />
        {t('admin.recentAvalanches.title.create')}
      </ButtonLink>

      <RecentAvalanchesFilters
        dateFrom={dateFrom}
        dateMode={dateMode}
        dateTo={dateTo}
        onDateFromChange={onDateFromChange}
        onDateModeChange={onDateModeChange}
        onDateToChange={onDateToChange}
        onReset={onFiltersReset}
      />

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
    </>
  )
}

export default RecentAvalanchesContainer
