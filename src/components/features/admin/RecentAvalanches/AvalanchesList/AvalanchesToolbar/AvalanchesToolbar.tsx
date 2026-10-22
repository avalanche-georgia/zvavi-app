import { Button } from '@ds/primitives'
import { useTranslations } from 'next-intl'

import CatalogFilters from './CatalogFilters'
import DateFilter from './DateFilter'
import type { AvalanchesListPage } from '../hooks/useAvalanchesListPage'
import type { AvalanchesListVariant } from '../types'

type AvalanchesToolbarProps = {
  page: AvalanchesListPage
  variant: AvalanchesListVariant
}

// Filters row above the table; the catalog adds source and status
const AvalanchesToolbar = ({ page, variant }: AvalanchesToolbarProps) => {
  const t = useTranslations()

  return (
    <div className="flex flex-wrap items-center gap-3">
      <DateFilter page={page} />
      {variant === 'catalog' && <CatalogFilters page={page} />}
      {page.hasFilters && (
        <Button onClick={page.onFiltersClear} variant="secondary">
          {t('admin.shared.list.clearFilters')}
        </Button>
      )}
    </div>
  )
}

export default AvalanchesToolbar
