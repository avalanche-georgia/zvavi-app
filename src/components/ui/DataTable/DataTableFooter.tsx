import { type RowData, type Table } from '@tanstack/react-table'
import { useTranslations } from 'next-intl'

import { Pagination } from '../Pagination'

type DataTableFooterProps<TData extends RowData> = {
  table: Table<TData>
}

const DataTableFooter = <TData extends RowData>({ table }: DataTableFooterProps<TData>) => {
  const t = useTranslations()
  const totalPages = table.getPageCount()

  if (totalPages <= 1) return null

  const { pageIndex, pageSize } = table.getState().pagination
  const rowCount = table.getRowCount()
  const from = pageIndex * pageSize + 1
  const to = Math.min((pageIndex + 1) * pageSize, rowCount)

  return (
    <div className="flex h-14 flex-none items-center justify-between border-t px-4">
      <span className="text-sm text-gray-500">
        {t('common.table.rowRange', { from, to, total: rowCount })}
      </span>
      <Pagination
        currentPage={pageIndex + 1}
        onPageChange={(page) => table.setPageIndex(page - 1)}
        totalPages={totalPages}
      />
    </div>
  )
}

export default DataTableFooter
