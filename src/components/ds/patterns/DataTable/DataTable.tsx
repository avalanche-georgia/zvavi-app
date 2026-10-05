'use client'

import type { ColumnDef, RowData } from '@tanstack/react-table'
import { LoaderIcon } from 'lucide-react'

import DataTableBody from './DataTableBody'
import DataTableCards from './DataTableCards'
import DataTableFooter from './DataTableFooter'
import DataTableHead from './DataTableHead'
import type { DataTableLabels, DataTableSort } from './types'
import useCardMode from './useCardMode'
import useDataTable from './useDataTable'
import useElementWidth from './useElementWidth'

import { cn } from '@/lib/utils'

type DataTableProps<TData extends RowData> = {
  ariaLabel: string
  className?: string
  // Stable cell / header components (module scope) — flexRender mounts them as components
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: ColumnDef<TData, any>[]
  data: TData[]
  // Shown instead of the table when `data` is empty
  empty: React.ReactNode
  getRowClassName?: (row: TData) => string | undefined
  getRowId: (row: TData) => string
  isLoading?: boolean
  labels: DataTableLabels
  onPageChange: (pageIndex: number) => void
  onSortChange: (sort: DataTableSort) => void
  pageIndex: number
  pageSize?: number
  // ≤640px table width: each row renders as this card instead
  renderCard?: (row: TData) => React.ReactNode
  sort: DataTableSort
}

// Sortable, paginated table on the table's own width: columns hide by container query,
// and narrow tables switch to cards. overflow-clip keeps the corners and the sticky header.
const DataTable = <TData extends RowData>(props: DataTableProps<TData>) => {
  const { ariaLabel, className, data, empty, getRowClassName, isLoading, labels, onPageChange } =
    props
  const { pageSize = 15, renderCard } = props
  const { ref, width } = useElementWidth<HTMLDivElement>()
  const { rows, safePageIndex, table } = useDataTable({ ...props, pageSize })
  const isCardMode = useCardMode(width, !!renderCard)

  return (
    // Focusable region: when a focused row leaves (deleted, filtered out) focus lands here
    <div
      ref={ref}
      aria-label={ariaLabel}
      className={cn(
        'rounded-card border-rule bg-surface focus-ring @container overflow-clip border',
        className,
      )}
      data-table-root
      role="region"
      tabIndex={-1}
    >
      {isLoading && (
        <div className="grid h-60 place-items-center">
          <LoaderIcon aria-hidden className="text-muted size-6 animate-spin" />
        </div>
      )}
      {!isLoading && data.length === 0 && empty}
      {!isLoading && data.length > 0 && (
        <>
          {isCardMode && renderCard ? (
            <DataTableCards ariaLabel={ariaLabel} renderCard={renderCard} rows={rows} />
          ) : (
            <table
              aria-label={ariaLabel}
              className="w-full table-fixed border-separate border-spacing-0"
            >
              <DataTableHead table={table} />
              <DataTableBody getRowClassName={getRowClassName} rows={rows} />
            </table>
          )}
          <DataTableFooter
            labels={labels}
            onPageChange={onPageChange}
            pageIndex={safePageIndex}
            pageSize={pageSize}
            total={data.length}
          />
        </>
      )}
    </div>
  )
}

export default DataTable
