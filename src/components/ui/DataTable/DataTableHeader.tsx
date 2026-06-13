import { flexRender, type RowData, type Table } from '@tanstack/react-table'
import { cn } from 'src/lib/utils'

import './types'

type DataTableHeaderProps<TData extends RowData> = {
  table: Table<TData>
}

const DataTableHeader = <TData extends RowData>({ table }: DataTableHeaderProps<TData>) => (
  <thead className="sticky top-0 z-10">
    {table.getHeaderGroups().map((headerGroup) => (
      <tr key={headerGroup.id} className="bg-gray-100">
        {headerGroup.headers.map((header) => (
          <th
            key={header.id}
            className={cn(
              'px-4 py-1.5 text-left text-sm font-semibold',
              header.column.columnDef.meta?.className,
            )}
          >
            {flexRender(header.column.columnDef.header, header.getContext())}
          </th>
        ))}
      </tr>
    ))}
  </thead>
)

export default DataTableHeader
