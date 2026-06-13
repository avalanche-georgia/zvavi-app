import { flexRender, type RowData, type Table } from '@tanstack/react-table'
import { cn } from 'src/lib/utils'

import './types'

type DataTableHeaderProps<TData extends RowData> = {
  table: Table<TData>
}

const DataTableHeader = <TData extends RowData>({ table }: DataTableHeaderProps<TData>) => (
  <>
    {table.getHeaderGroups().map((headerGroup) => (
      <div
        key={headerGroup.id}
        className="flex shrink-0 items-center gap-4 border-b bg-gray-100 px-4 py-1.5"
      >
        {headerGroup.headers.map((header) => (
          <div
            key={header.id}
            className={cn('text-sm font-semibold', header.column.columnDef.meta?.className)}
          >
            {flexRender(header.column.columnDef.header, header.getContext())}
          </div>
        ))}
      </div>
    ))}
  </>
)

export default DataTableHeader
