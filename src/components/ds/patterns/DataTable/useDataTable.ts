'use client'
'use no memo'

import {
  type ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type RowData,
  type SortingState,
  type Updater,
  useReactTable,
} from '@tanstack/react-table'

import type { DataTableSort } from './types'

type DataTableInput<TData extends RowData> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: ColumnDef<TData, any>[]
  data: TData[]
  getRowId: (row: TData) => string
  onSortChange: (sort: DataTableSort) => void
  pageIndex: number
  pageSize: number
  sort: DataTableSort
}

const useDataTable = <TData extends RowData>({
  columns,
  data,
  getRowId,
  onSortChange,
  pageIndex,
  pageSize,
  sort,
}: DataTableInput<TData>) => {
  const sorting: SortingState = [sort]
  // A stale page (rows deleted, filters narrowed) shows the last page instead of nothing
  const lastPageIndex = Math.max(0, Math.ceil(data.length / pageSize) - 1)
  const safePageIndex = Math.min(pageIndex, lastPageIndex)

  const handleSortingChange = (updater: Updater<SortingState>) => {
    const [nextSort] = typeof updater === 'function' ? updater(sorting) : updater

    if (!nextSort) return
    onSortChange({ desc: nextSort.desc, id: nextSort.id })
  }

  // TODO: Revise 'use no memo' when upgrading Tanstack Table to v9.
  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    columns,
    data,
    defaultColumn: { enableSorting: false },
    enableMultiSort: false,
    enableSortingRemoval: false,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getRowId,
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: handleSortingChange,
    sortDescFirst: true,
    state: { pagination: { pageIndex: safePageIndex, pageSize }, sorting },
  })

  return { rows: table.getRowModel().rows, safePageIndex, table }
}

export default useDataTable
