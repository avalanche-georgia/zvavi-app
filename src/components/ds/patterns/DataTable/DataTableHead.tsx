import type { RowData, Table } from '@tanstack/react-table'

import HeaderCell from './HeaderCell'

const DataTableHead = <TData extends RowData>({ table }: { table: Table<TData> }) => (
  <thead>
    {table.getHeaderGroups().map((headerGroup) => (
      <tr key={headerGroup.id}>
        {headerGroup.headers.map((header) => (
          <HeaderCell key={header.id} header={header} />
        ))}
      </tr>
    ))}
  </thead>
)

export default DataTableHead
