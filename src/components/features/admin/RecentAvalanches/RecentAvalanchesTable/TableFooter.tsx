'use client'

import { Pagination, type PaginationProps } from '@components/ui'
import type { AvalancheListItem } from '@data/hooks/recentAvalanches'
import { useTranslations } from 'next-intl'

export type TableFooterProps = {
  avalanches: AvalancheListItem[]
  grandTotal: number
  paginationProps: PaginationProps
}

const TableFooter = ({ avalanches, grandTotal, paginationProps }: TableFooterProps) => {
  const t = useTranslations()
  const { currentPage, onPageChange, totalPages } = paginationProps

  return (
    <footer className="flex h-14 flex-none items-center justify-between border-t px-4">
      <span className="text-sm text-gray-500">
        {t('admin.recentAvalanches.list.total', { shown: avalanches.length, total: grandTotal })}
      </span>
      {totalPages > 1 && (
        <Pagination currentPage={currentPage} onPageChange={onPageChange} totalPages={totalPages} />
      )}
    </footer>
  )
}

export default TableFooter
