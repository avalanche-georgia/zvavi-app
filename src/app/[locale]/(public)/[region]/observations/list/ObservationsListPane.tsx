import { Loading } from '@components/shared'
import type { ObservationDateBasis, ObservationsSort } from '@domain/types'
import { useTranslations } from 'next-intl'

import LoadMoreTrigger from './LoadMoreTrigger'
import ObservationsEmptyState from './ObservationsEmptyState'
import ObservationsList from './ObservationsList'
import PendingOwnReports from './PendingOwnReports'
import type { ObservationsListState } from '../hooks/useObservationsPage'

import { cn } from '@/lib/utils'

type ObservationsListPaneProps = {
  dateBasis: ObservationDateBasis
  list: ObservationsListState
  onHover: (id: number | null) => void
  onOpen: (id: number) => void
  selectedId: number | null
  sort: ObservationsSort
}

const ObservationsListPane = ({
  dateBasis,
  list,
  onHover,
  onOpen,
  selectedId,
  sort,
}: ObservationsListPaneProps) => {
  const t = useTranslations()
  const { hasNextPage, isError, isPending, observations } = list

  const renderContent = () => {
    if (isPending) {
      return <Loading className="h-48 py-0" isPage />
    }

    if (isError) return <p className="text-muted py-12 text-center">{t('common.messages.error')}</p>

    if (observations.length === 0) {
      return (
        <ObservationsEmptyState hasFilters={list.hasFilters} onFiltersClear={list.onFiltersClear} />
      )
    }

    return (
      <div
        aria-busy={list.isStale}
        className={cn('transition-opacity', list.isStale && 'opacity-50')}
      >
        <ObservationsList
          dateBasis={dateBasis}
          hasMore={hasNextPage}
          observations={observations}
          onHover={onHover}
          onOpen={onOpen}
          selectedId={selectedId}
          sort={sort}
        />
        {/* A stale list's "next page" belongs to the previous filter */}
        {hasNextPage && !list.isStale && (
          <LoadMoreTrigger
            isError={list.isNextPageError}
            isLoading={list.isFetchingNextPage}
            onLoadMore={list.onFetchNextPage}
          />
        )}
      </div>
    )
  }

  // Bottom padding keeps the last card clear of the floating Report button
  return (
    <div className="px-4 pt-1 pb-28 lg:pb-24">
      <PendingOwnReports reports={list.pendingOwnReports} />
      {renderContent()}
    </div>
  )
}

export default ObservationsListPane
