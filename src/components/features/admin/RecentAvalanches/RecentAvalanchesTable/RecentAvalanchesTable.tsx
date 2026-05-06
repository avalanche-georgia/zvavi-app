'use client'

import { Spinner } from '@components/ui'
import type { RegionId } from '@domain/types'

import TableContent from './TableContent'
import TableFooter, { type TableFooterProps } from './TableFooter'
import TableHeader from './TableHeader'

type RecentAvalanchesTableProps = { isPending: boolean; regionId: RegionId } & TableFooterProps

const RecentAvalanchesTable = ({
  avalanches,
  grandTotal,
  isPending,
  paginationProps,
  regionId,
}: RecentAvalanchesTableProps) => (
  <div className="relative flex max-h-[calc(100vh-14rem)] w-full flex-col overflow-hidden rounded-sm border bg-white shadow-sm">
    <TableHeader />
    {isPending ? (
      <div className="flex h-screen items-center justify-center">
        <Spinner />
      </div>
    ) : (
      <>
        <TableContent avalanches={avalanches} regionId={regionId} />
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
