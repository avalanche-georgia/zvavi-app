import type { Row, RowData } from '@tanstack/react-table'

type DataTableCardsProps<TData extends RowData> = {
  renderCard: (row: TData) => React.ReactNode
  rows: Row<TData>[]
}

// Narrow tables: one card per row, laid out by the caller
const DataTableCards = <TData extends RowData>({
  renderCard,
  rows,
}: DataTableCardsProps<TData>) => (
  <ul>
    {rows.map((row) => (
      <li key={row.id} className="border-rule border-b px-3 py-3 last:border-b-0">
        {renderCard(row.original)}
      </li>
    ))}
  </ul>
)

export default DataTableCards
