import { flexRender, type Row, type RowData, type Table } from '@tanstack/react-table'
import { cn } from 'src/lib/utils'

import './types'

type DataTableBodyProps<TData extends RowData> = {
  emptyMessage?: string
  getRowClassName?: (row: Row<TData>) => string | undefined
  table: Table<TData>
}

const DataTableBody = <TData extends RowData>({
  emptyMessage,
  getRowClassName,
  table,
}: DataTableBodyProps<TData>) => {
  const rows = table.getRowModel().rows

  if (rows.length === 0) {
    return <div className="py-8 text-center text-gray-500">{emptyMessage}</div>
  }

  return (
    <div className="flex flex-col">
      {rows.map((row) => (
        <div
          key={row.id}
          className={cn(
            'flex h-12 items-center gap-4 border-b px-4 last:border-0 even:bg-gray-100/60',
            getRowClassName?.(row),
          )}
        >
          {row.getVisibleCells().map((cell) => (
            <div key={cell.id} className={cn('text-sm', cell.column.columnDef.meta?.className)}>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default DataTableBody
