'use client'

import { useState } from 'react'
import { type CellContext, createColumnHelper } from '@tanstack/react-table'

import DataTable from './DataTable'
import type { DataTableSort } from './types'

type DemoRow = { date: string; id: number; level: number; name: string }

const rows: DemoRow[] = Array.from({ length: 23 }, (_, index) => ({
  date: `2026-0${(index % 9) + 1}-1${index % 10}`,
  id: 180 - index,
  level: (index % 5) + 1,
  name: `Forecast with a fairly long name to show truncation #${180 - index}`,
}))

const columnHelper = createColumnHelper<DemoRow>()

const NameCell = ({ row }: CellContext<DemoRow, unknown>) => (
  <span className="block truncate">{row.original.name}</span>
)

const columns = [
  columnHelper.accessor('level', {
    enableSorting: true,
    header: 'Level',
    meta: { cellClassName: 'w-20' },
  }),
  columnHelper.display({ cell: NameCell, header: 'Name', id: 'name' }),
  columnHelper.accessor('date', {
    enableSorting: true,
    header: 'Date',
    meta: { cellClassName: 'w-32', hideBelow: 'lg' },
  }),
  columnHelper.accessor('id', { header: 'ID', meta: { cellClassName: 'w-20', hideBelow: 'md' } }),
]

const labels = {
  nextPage: 'Next page',
  previousPage: 'Previous page',
  rowRange: ({ from, to, total }: { from: number; to: number; total: number }) =>
    `${from}–${to} of ${total}`,
}

const noop = () => undefined
const getRowId = ({ id }: DemoRow) => String(id)
const renderCard = ({ level, name }: DemoRow) => (
  <div className="flex justify-between gap-3">
    <span className="truncate">{name}</span>
    <span>{level}</span>
  </div>
)
const emptyState = <p className="text-muted p-8 text-center">Nothing here</p>

const DataTableGallery = () => {
  const [sort, setSort] = useState<DataTableSort>({ desc: true, id: 'date' })
  const [pageIndex, setPageIndex] = useState(0)

  return (
    <div className="flex flex-col gap-4">
      <p className="text-caption text-muted">Drag the bottom-right corner to resize.</p>
      <div className="w-full max-w-full resize-x overflow-auto p-1">
        <DataTable
          ariaLabel="Demo"
          columns={columns}
          data={rows}
          empty={emptyState}
          getRowId={getRowId}
          labels={labels}
          onPageChange={setPageIndex}
          onSortChange={setSort}
          pageIndex={pageIndex}
          pageSize={10}
          renderCard={renderCard}
          sort={sort}
        />
      </div>
      <DataTable
        ariaLabel="Empty"
        columns={columns}
        data={[]}
        empty={emptyState}
        getRowId={getRowId}
        labels={labels}
        onPageChange={noop}
        onSortChange={noop}
        pageIndex={0}
        sort={sort}
      />
      <DataTable
        ariaLabel="Loading"
        columns={columns}
        data={[]}
        empty={emptyState}
        getRowId={getRowId}
        isLoading
        labels={labels}
        onPageChange={noop}
        onSortChange={noop}
        pageIndex={0}
        sort={sort}
      />
    </div>
  )
}

export default DataTableGallery
