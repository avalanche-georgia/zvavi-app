'use client'
'use no memo'

import { useState } from 'react'
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  type OnChangeFn,
  type PaginationState,
  type Row,
  type RowData,
  useReactTable,
} from '@tanstack/react-table'
import { cn } from 'src/lib/utils'

import DataTableFooter from './DataTableFooter'
import DataTableHeader from './DataTableHeader'
import './types'

type DataTableProps<TData extends RowData> = {
  className?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: ColumnDef<TData, any>[]
  data: TData[]
  emptyMessage?: string
  getRowClassName?: (row: Row<TData>) => string | undefined
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

  const rows = table.getRowModel().rows

  return (
    <div
      className={cn(
        'flex flex-col overflow-hidden rounded-sm border bg-white shadow-sm',
        className,
      )}
    >
      <div className="min-h-0 flex-1 overflow-y-auto">
        <table className="w-full">
          <DataTableHeader table={table} />
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td className="py-8 text-center text-gray-500" colSpan={columns.length}>
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr
                  key={row.id}
                  className={cn(
                    'h-12 border-b last:border-0 even:bg-gray-100/60',
                    getRowClassName?.(row),
                  )}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className={cn('px-4 text-sm', cell.column.columnDef.meta?.className)}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <DataTableFooter table={table} />
    </div>
  )
}

export default DataTable
