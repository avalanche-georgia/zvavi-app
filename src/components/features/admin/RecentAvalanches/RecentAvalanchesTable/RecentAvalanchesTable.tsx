'use client'

import { Spinner } from '@components/ui'
import type { RegionId } from '@domain/types'

import TableContent from './TableContent'
import TableFooter, { type TableFooterProps } from './TableFooter'
import TableHeader from './TableHeader'
import type { AvalancheTableVariant, OnAvalancheOpen } from './types'

type RecentAvalanchesTableProps = {
  isPending: boolean
  onAvalancheOpen: OnAvalancheOpen
  regionId: RegionId
  variant: AvalancheTableVariant
} & TableFooterProps

const RecentAvalanchesTable = ({
  avalanches,
  grandTotal,
  isPending,
  onAvalancheOpen,
  paginationProps,
  regionId,
  variant,
}: RecentAvalanchesTableProps) => (
  <div className="relative flex max-h-[calc(100vh-14rem)] w-full flex-col overflow-hidden rounded-sm border bg-white shadow-sm">
    <TableHeader variant={variant} />
    {isPending ? (
      <div className="flex h-screen items-center justify-center">
        <Spinner />
      </div>
    ) : (
      <>
        <TableContent
          avalanches={avalanches}
          onAvalancheOpen={onAvalancheOpen}
          regionId={regionId}
          variant={variant}
        />
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
