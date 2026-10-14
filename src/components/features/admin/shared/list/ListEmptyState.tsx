import { Button } from '@ds/primitives'
import { useTranslations } from 'next-intl'

type ListEmptyStateProps = {
  hint: string
  // Given when filters hide every row: offers the way back to the full list
  onFiltersClear?: VoidFunction
  title: string
}

// Shown instead of the table: either nothing exists yet, or nothing matches the filters
const ListEmptyState = ({ hint, onFiltersClear, title }: ListEmptyStateProps) => {
  const t = useTranslations()

  return (
    <div className="flex flex-col items-center gap-1.5 px-6 py-14 text-center">
      <p className="text-copy-lg text-ink font-semibold">{title}</p>
      <p className="text-copy-sm text-muted">{hint}</p>
      {onFiltersClear && (
        <Button className="mt-2" onClick={onFiltersClear} size="sm" variant="secondary">
          {t('admin.shared.list.clearFilters')}
        </Button>
      )}
    </div>
  )
}

export default ListEmptyState
