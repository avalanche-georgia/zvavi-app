import { flexRender, type Row, type RowData } from '@tanstack/react-table'

import { getCellClasses } from './cellClasses'

import { cn } from '@/lib/utils'

type DataTableBodyProps<TData extends RowData> = {
  getRowClassName?: (row: TData) => string | undefined
  rows: Row<TData>[]
}

// Row rules live on the cells — border-separate tables don't draw <tr> borders
const DataTableBody = <TData extends RowData>({
  getRowClassName,
  rows,
}: DataTableBodyProps<TData>) => (
  <tbody>
    {rows.map((row) => (
      <tr
        key={row.id}
        className={cn('hover:bg-canvas group h-15', getRowClassName?.(row.original))}
      >
        {row.getVisibleCells().map((cell) => (
          <td
            key={cell.id}
            className={cn(
              'text-copy text-ink border-rule border-b align-middle group-last:border-b-0',
              getCellClasses(cell.column.columnDef.meta),
            )}
          >
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </td>
        ))}
      </tr>
    ))}
  </tbody>
)

export default DataTableBody
