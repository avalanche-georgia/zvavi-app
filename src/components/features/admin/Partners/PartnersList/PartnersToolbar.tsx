import { CountedSegments, ListToolbar } from '@components/features/admin/shared'
import { useTranslations } from 'next-intl'

import type { PartnersListState } from './hooks'
import { type StatusFilter, statusFilters } from './model'

type PartnersToolbarProps = {
  counts: Record<StatusFilter, number>
  list: PartnersListState
  onCreate: VoidFunction
  searchResetKey: number
}

const PartnersToolbar = ({ counts, list, onCreate, searchResetKey }: PartnersToolbarProps) => {
  const t = useTranslations()

  const getStatusLabel = (status: StatusFilter) => t(`admin.partners.filters.status.${status}`)

  return (
    <ListToolbar
      createLabel={t('admin.partners.title.create')}
      onCreate={onCreate}
      onQueryChange={list.onQueryChange}
      query={list.query}
      searchLabel={t('admin.partners.filters.searchLabel')}
      searchPlaceholder={t('admin.partners.filters.searchPlaceholder')}
      searchResetKey={searchResetKey}
    >
      <CountedSegments
        ariaLabel={t('admin.partners.filters.status.label')}
        counts={counts}
        getLabel={getStatusLabel}
        onChange={list.onStatusChange}
        options={statusFilters}
        value={list.status}
      />
    </ListToolbar>
  )
}

export default PartnersToolbar
