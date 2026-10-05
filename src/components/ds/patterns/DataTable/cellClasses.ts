import type { ColumnMeta, RowData } from '@tanstack/react-table'

import type { DataTableBreakpoint } from './types'

import { cn } from '@/lib/utils'

// Container queries on the table's own width — the admin sidebar eats viewport space
const hideBelowClasses: Record<DataTableBreakpoint, string> = {
  lg: '@max-[62.5rem]:hidden',
  md: '@max-[53.75rem]:hidden',
}

export const getCellClasses = <TData extends RowData>(meta?: ColumnMeta<TData, unknown>) =>
  cn(
    'px-4',
    meta?.align === 'end' ? 'text-right' : 'text-left',
    meta?.hideBelow && hideBelowClasses[meta.hideBelow],
    meta?.cellClassName,
  )
