import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import DataTable from './DataTable'
import type { DataTableLabels } from './types'

import { createColumnHelper } from '.'

type Row = { id: string; name: string }

const columnHelper = createColumnHelper<Row>()
const columns = [columnHelper.accessor('name', { enableSorting: true, header: 'Name' })]
const rows: Row[] = ['1', '2', '3', '4'].map((id) => ({ id, name: `Forecast ${id}` }))

const labels: DataTableLabels = {
  loading: 'Loading',
  nextPage: 'Next page',
  previousPage: 'Previous page',
  rowRange: ({ from, to, total }) => `${from}–${to} of ${total}`,
}

const renderTable = (props: Partial<React.ComponentProps<typeof DataTable<Row>>> = {}) => {
  const handlers = { onPageChange: vi.fn(), onSortChange: vi.fn() }

  render(
    <DataTable
      ariaLabel="Forecasts"
      columns={columns}
      data={rows}
      empty={<p>No forecasts</p>}
      getRowId={(row) => row.id}
      labels={labels}
      pageIndex={0}
      pageSize={2}
      sort={{ desc: false, id: 'name' }}
      {...handlers}
      {...props}
    />,
  )

  return handlers
}

// jsdom has no ResizeObserver; the table measures its own width with one
beforeEach(() => {
  vi.stubGlobal(
    'ResizeObserver',
    class {
      disconnect = () => undefined
      observe = () => undefined
    },
  )
})

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('DataTable', () => {
  it('pages its own data and reports page changes', async () => {
    const { onPageChange } = renderTable()
    const table = screen.getByRole('table', { name: 'Forecasts' })

    expect(within(table).getAllByRole('row')).toHaveLength(3)
    expect(screen.getByText('1–2 of 4')).toBeInTheDocument()

    await userEvent.click(screen.getByRole('button', { name: 'Next page' }))
    expect(onPageChange).toHaveBeenCalledWith(1)
  })

  it('marks the sorted column and reports a new sort', async () => {
    const { onSortChange } = renderTable()

    expect(screen.getByRole('columnheader', { name: 'Name' })).toHaveAttribute(
      'aria-sort',
      'ascending',
    )
    await userEvent.click(screen.getByRole('button', { name: 'Name' }))

    expect(onSortChange).toHaveBeenCalledWith({ desc: true, id: 'name' })
  })

  it.each([
    ['the loader while loading', { isLoading: true }, 'Loading'],
    ['the empty state without rows', { data: [] }, 'No forecasts'],
  ])('shows %s instead of the table', (_case, props, text) => {
    renderTable(props)

    expect(screen.getByText(text)).toBeInTheDocument()
    expect(screen.queryByRole('table')).not.toBeInTheDocument()
  })
})
