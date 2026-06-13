'use client'
'use no memo'

import { useState } from 'react'
import {
  type ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  type OnChangeFn,
  type PaginationState,
  type Row,
  type RowData,
  useReactTable,
} from '@tanstack/react-table'
import { cn } from 'src/lib/utils'

import DataTableBody from './DataTableBody'
import DataTableFooter from './DataTableFooter'
import DataTableHeader from './DataTableHeader'
import './types'
import Spinner from '../Spinner'

type DataTableProps<TData extends RowData> = {
  className?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: ColumnDef<TData, any>[]
  data: TData[]
  emptyMessage?: string
  getRowClassName?: (row: Row<TData>) => string | undefined
  isFetching?: boolean
  isLoading?: boolean
  onPaginationChange?: OnChangeFn<PaginationState>
  pagination?: PaginationState
  rowCount?: number
}

const defaultPageSize = 15

const DataTable = <TData extends RowData>({
  className,
  columns,
  data,
  emptyMessage,
  getRowClassName,
  isFetching,
  isLoading,
  onPaginationChange,
  pagination,
  rowCount,
}: DataTableProps<TData>) => {
  const [internalPagination, setInternalPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: defaultPageSize,
  })

  const handlePaginationChange = onPaginationChange ?? setInternalPagination

  // TODO: Revise 'use no memo' when upgrading Tanstack Table to v9.
  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: pagination !== undefined,
    onPaginationChange: handlePaginationChange,
    rowCount,
    state: { pagination: pagination ?? internalPagination },
  })

  return (
    <div
      className={cn(
        'flex flex-col overflow-hidden rounded-sm border bg-white shadow-sm',
        className,
      )}
    >
      <DataTableHeader table={table} />

      {isLoading ? (
        <div className="flex flex-1 items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <>
          <div className="relative flex-1 overflow-y-auto">
            <DataTableBody
              emptyMessage={emptyMessage}
              getRowClassName={getRowClassName}
              table={table}
            />
            {isFetching && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/60">
                <Spinner />
              </div>
            )}
          </div>
          <DataTableFooter table={table} />
        </>
      )}
    </div>
  )
}

export default DataTable
