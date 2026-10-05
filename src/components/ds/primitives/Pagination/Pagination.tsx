import { ChevronLeft, ChevronRight } from 'lucide-react'

import { IconButton } from '../IconButton'

type PaginationProps = {
  // 1-based
  currentPage: number
  nextLabel: string
  onPageChange: (page: number) => void
  previousLabel: string
  totalPages: number
}

// ‹ 2 / 5 ›
const Pagination = ({
  currentPage,
  nextLabel,
  onPageChange,
  previousLabel,
  totalPages,
}: PaginationProps) => (
  <div className="text-copy-sm text-body flex items-center gap-2 tabular-nums">
    <IconButton
      aria-label={previousLabel}
      disabled={currentPage <= 1}
      onClick={() => onPageChange(currentPage - 1)}
    >
      <ChevronLeft className="size-4.5" />
    </IconButton>
    <span>
      {currentPage} / {totalPages}
    </span>
    <IconButton
      aria-label={nextLabel}
      disabled={currentPage >= totalPages}
      onClick={() => onPageChange(currentPage + 1)}
    >
      <ChevronRight className="size-4.5" />
    </IconButton>
  </div>
)

export default Pagination
