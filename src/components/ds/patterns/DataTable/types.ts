import type { RowData } from '@tanstack/react-table'

// Table widths (container queries) at or below which a column hides: lg ≤1000px, md ≤860px
export type DataTableBreakpoint = 'lg' | 'md'

declare module '@tanstack/react-table' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    align?: 'end' | 'start'
    // Extra classes for the header and body cells, e.g. a width
    cellClassName?: string
    hideBelow?: DataTableBreakpoint
  }
}

export type DataTableSort = { desc: boolean; id: string }

export type DataTableLabels = {
  nextPage: string
  previousPage: string
  // e.g. "1–15 of 40"
  rowRange: (range: { from: number; to: number; total: number }) => string
}
