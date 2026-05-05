'use client'

import { Spinner } from '@components/ui'

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
  <div className="relative flex max-h-[calc(100vh-14rem)] w-full flex-col overflow-hidden rounded-sm border bg-white shadow-sm">
    <TableHeader />
    {isPending ? (
      <div className="flex h-screen items-center justify-center">
        <Spinner />
      </div>
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
