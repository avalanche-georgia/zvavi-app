import { IconButton } from '@components/ui/IconButton'

export type PaginationProps = {
  currentPage: number
  onPageChange: (page: number) => void
  totalPages: number
}

const Pagination = ({ currentPage, onPageChange, totalPages }: PaginationProps) => (
  <div className="flex items-center justify-center gap-3">
    <IconButton
      aria-label="Previous page"
      disabled={currentPage <= 1}
      iconProps={{ icon: 'chevronLeft' }}
      onClick={() => onPageChange(currentPage - 1)}
    />
    <span className="text-sm text-gray-600">
      {currentPage} / {totalPages}
    </span>
    <IconButton
      aria-label="Next page"
      disabled={currentPage >= totalPages}
      iconProps={{ icon: 'chevronRight' }}
      onClick={() => onPageChange(currentPage + 1)}
    />
  </div>
)

export default Pagination
