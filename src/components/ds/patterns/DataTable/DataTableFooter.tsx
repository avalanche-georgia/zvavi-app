import type { DataTableLabels } from './types'
import { Pagination } from '../../primitives'

type DataTableFooterProps = {
  labels: DataTableLabels
  onPageChange: (pageIndex: number) => void
  pageIndex: number
  pageSize: number
  total: number
}

const DataTableFooter = ({
  labels,
  onPageChange,
  pageIndex,
  pageSize,
  total,
}: DataTableFooterProps) => {
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const from = pageIndex * pageSize + 1
  const to = Math.min(total, from + pageSize - 1)

  const handlePageChange = (page: number) => onPageChange(page - 1)

  return (
    <div className="border-rule text-copy-sm text-muted flex h-14 items-center justify-between gap-4 border-t px-4">
      <span className="tabular-nums">{labels.rowRange({ from, to, total })}</span>
      {totalPages > 1 && (
        <Pagination
          currentPage={pageIndex + 1}
          nextLabel={labels.nextPage}
          onPageChange={handlePageChange}
          previousLabel={labels.previousPage}
          totalPages={totalPages}
        />
      )}
    </div>
  )
}

export default DataTableFooter
