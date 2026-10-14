import { CountedSegments, ListToolbar } from '@components/features/admin/shared'
import { useTranslations } from 'next-intl'

import type { MembersListState } from './hooks'
import { type StatusFilter, statusFilters } from './model'

type MembersToolbarProps = {
  counts: Record<StatusFilter, number>
  list: MembersListState
  onCreate: VoidFunction
  searchResetKey: number
}

const MembersToolbar = ({ counts, list, onCreate, searchResetKey }: MembersToolbarProps) => {
  const t = useTranslations()

  const getStatusLabel = (status: StatusFilter) =>
    status === 'all' ? t('admin.members.filters.all') : t(`admin.members.statuses.${status}`)

  return (
    <ListToolbar
      createLabel={t('admin.members.title.create')}
      onCreate={onCreate}
      onQueryChange={list.onQueryChange}
      query={list.query}
      searchLabel={t('admin.members.filters.searchLabel')}
      searchPlaceholder={t('admin.members.filters.searchPlaceholder')}
      searchResetKey={searchResetKey}
    >
      <CountedSegments
        ariaLabel={t('admin.members.filters.statusLabel')}
        counts={counts}
        getLabel={getStatusLabel}
        onChange={list.onStatusChange}
        options={statusFilters}
        value={list.status}
      />
    </ListToolbar>
  )
}

export default MembersToolbar
