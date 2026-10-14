import { CountedSegments, ListSearchBox } from '@components/features/admin/shared'
import { Button } from '@ds/primitives'
import { Plus } from 'lucide-react'
import { useTranslations } from 'next-intl'

import type { MembersListState } from './hooks'
import { type StatusFilter, statusFilters } from './model'

type MembersToolbarProps = {
  counts: Record<StatusFilter, number>
  list: MembersListState
  onCreate: VoidFunction
  // Bumped by "Clear filters" so the search box drops its text and any pending write
  searchResetKey: number
}

const MembersToolbar = ({ counts, list, onCreate, searchResetKey }: MembersToolbarProps) => {
  const t = useTranslations()

  const getStatusLabel = (status: StatusFilter) =>
    status === 'all' ? t('admin.members.filters.all') : t(`admin.members.statuses.${status}`)

  return (
    <div className="flex flex-wrap items-center gap-3">
      <CountedSegments
        ariaLabel={t('admin.members.filters.statusLabel')}
        counts={counts}
        getLabel={getStatusLabel}
        onChange={list.onStatusChange}
        options={statusFilters}
        value={list.status}
      />
      {/* Search and Add stay together when the row wraps */}
      <div className="flex w-full items-center gap-3 sm:ml-auto sm:w-auto">
        <ListSearchBox
          className="min-w-0 flex-1 sm:ml-0 sm:flex-none"
          label={t('admin.members.filters.searchLabel')}
          onQueryChange={list.onQueryChange}
          placeholder={t('admin.members.filters.searchPlaceholder')}
          query={list.query}
          resetKey={searchResetKey}
        />
        <Button onClick={onCreate} size="sm">
          <Plus aria-hidden className="size-4" />
          {t('admin.members.title.create')}
        </Button>
      </div>
    </div>
  )
}

export default MembersToolbar
