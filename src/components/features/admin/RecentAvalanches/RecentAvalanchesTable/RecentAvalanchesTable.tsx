'use client'

import { Spinner } from 'src/components/ui'

import TableContent from './TableContent'
import TableFooter, { type TableFooterProps } from './TableFooter'
import TableHeader from './TableHeader'

type RecentAvalanchesTableProps = { isPending: boolean } & TableFooterProps

const RecentAvalanchesTable = ({
  avalanches,
  grandTotal,
  isPending,
  paginationProps,
}: RecentAvalanchesTableProps) => (
  <div className="flex max-h-[calc(100vh-14rem)] w-full flex-col overflow-hidden rounded-sm border bg-white shadow-sm">
    <TableHeader />
    {isPending ? (
      <Spinner size="lg" />
    ) : (
      <>
        <TableContent avalanches={avalanches} />
        <TableFooter
          avalanches={avalanches}
          grandTotal={grandTotal}
          paginationProps={paginationProps}
        />
      </>
    )}
  </div>
)

export default RecentAvalanchesTable
