import type { Row, RowData } from '@tanstack/react-table'

type DataTableCardsProps<TData extends RowData> = {
  ariaLabel: string
  renderCard: (row: TData) => React.ReactNode
  rows: Row<TData>[]
}

// Narrow tables: one card per row, laid out by the caller
const DataTableCards = <TData extends RowData>({
  ariaLabel,
  renderCard,
  rows,
}: DataTableCardsProps<TData>) => (
  <ul aria-label={ariaLabel}>
    {rows.map((row) => (
      <li key={row.id} className="border-rule border-b px-3 py-3 last:border-b-0">
        {renderCard(row.original)}
      </li>
    ))}
  </ul>
)

export default DataTableCards
