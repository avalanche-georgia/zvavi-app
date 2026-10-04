import { flexRender, type Header, type RowData } from '@tanstack/react-table'
import { ChevronDown, ChevronUp } from 'lucide-react'

import { getCellClasses } from './cellClasses'

import { cn } from '@/lib/utils'

const ariaSortValues = { asc: 'ascending', desc: 'descending' } as const

const HeaderCell = <TData extends RowData>({ header }: { header: Header<TData, unknown> }) => {
  const { column } = header
  const sortDirection = column.getIsSorted()
  const label = flexRender(column.columnDef.header, header.getContext())
  const SortIcon = sortDirection === 'asc' ? ChevronUp : ChevronDown

  return (
    <th
      aria-sort={sortDirection ? ariaSortValues[sortDirection] : undefined}
      className={cn(
        // border-separate table: the bottom rule sticks with the header
        'bg-surface border-rule text-caption text-muted sticky top-0 z-10 h-11 border-b font-semibold tracking-wider uppercase',
        getCellClasses(column.columnDef.meta),
      )}
      scope="col"
    >
      {column.getCanSort() ? (
        <button
          className="focus-ring hover:text-ink inline-flex items-center gap-1 rounded-sm uppercase"
          onClick={column.getToggleSortingHandler()}
          type="button"
        >
          {label}
          {sortDirection && <SortIcon aria-hidden className="size-3.5" />}
        </button>
      ) : (
        label
      )}
    </th>
  )
}

export default HeaderCell
