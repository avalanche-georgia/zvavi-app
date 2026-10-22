import { Button } from '@ds/primitives'
import { Plus } from 'lucide-react'

import ListSearchBox from './ListSearchBox'

type ListToolbarProps = {
  // The list's filters (segments, date range), on the left
  children?: React.ReactNode
  createLabel: string
  onCreate: VoidFunction
  onQueryChange: (query: string) => void
  query: string
  searchLabel: string
  searchPlaceholder: string
  // Bumped by "Clear filters" so the search box drops its text and any pending write
  searchResetKey: number
}

// Row above a list: filters, then search and the list's "Add" button
const ListToolbar = ({
  children,
  createLabel,
  onCreate,
  onQueryChange,
  query,
  searchLabel,
  searchPlaceholder,
  searchResetKey,
}: ListToolbarProps) => (
  <div className="flex flex-wrap items-center gap-3">
    {children}
    {/* Search and Add stay together when the row wraps */}
    <div className="flex w-full items-center gap-3 sm:ml-auto sm:w-auto">
      <ListSearchBox
        className="min-w-0 flex-1 sm:ml-0 sm:flex-none"
        label={searchLabel}
        onQueryChange={onQueryChange}
        placeholder={searchPlaceholder}
        query={query}
        resetKey={searchResetKey}
      />
      <Button onClick={onCreate}>
        <Plus aria-hidden className="size-4" />
        {createLabel}
      </Button>
    </div>
  </div>
)

export default ListToolbar
