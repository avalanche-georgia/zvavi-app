'use client'

import {
  RecentAvalanchesFilters,
  RecentAvalanchesTable,
} from '@components/features/admin/RecentAvalanches'

import useRecentAvalanchesPage from './useRecentAvalanchesPage'

const RecentAvalanchesContainer = () => {
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
    onFiltersClear,
    onPageChange,
    page,
    totalPages,
  } = useRecentAvalanchesPage()

  return (
    <>
      <RecentAvalanchesFilters
        dateFrom={dateFrom}
        dateMode={dateMode}
        dateTo={dateTo}
        onClear={onFiltersClear}
        onDateFromChange={onDateFromChange}
        onDateModeChange={onDateModeChange}
        onDateToChange={onDateToChange}
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
