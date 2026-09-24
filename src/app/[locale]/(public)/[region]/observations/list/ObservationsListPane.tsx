import { Spinner } from '@components/ui'
import type { ObservationDateBasis, ObservationsSort } from '@domain/types'
import { useTranslations } from 'next-intl'

import LoadMoreTrigger from './LoadMoreTrigger'
import ObservationsEmptyState from './ObservationsEmptyState'
import ObservationsList from './ObservationsList'
import type { ObservationsListState } from '../hooks/useObservationsPage'

type ObservationsListPaneProps = {
  dateBasis: ObservationDateBasis
  list: ObservationsListState
  onOpen: (id: number) => void
  selectedId: number | null
  sort: ObservationsSort
}

const ObservationsListPane = ({
  dateBasis,
  list,
  onOpen,
  selectedId,
  sort,
}: ObservationsListPaneProps) => {
  const t = useTranslations()
  const { hasNextPage, isError, isPending, observations } = list

  const renderContent = () => {
    if (isPending) {
      return (
        <div className="relative h-48">
          <Spinner label={t('common.labels.wait')} size="lg" />
        </div>
      )
    }

    if (isError) return <p className="text-muted py-12 text-center">{t('common.messages.error')}</p>

    if (observations.length === 0) {
      return (
        <ObservationsEmptyState hasFilters={list.hasFilters} onFiltersClear={list.onFiltersClear} />
      )
    }

    return (
      <>
        <ObservationsList
          dateBasis={dateBasis}
          hasMore={hasNextPage}
          observations={observations}
          onOpen={onOpen}
          selectedId={selectedId}
          sort={sort}
        />
        {hasNextPage && (
          <LoadMoreTrigger
            isError={list.isNextPageError}
            isLoading={list.isFetchingNextPage}
            onLoadMore={list.onFetchNextPage}
          />
        )}
      </>
    )
  }

  // Bottom padding keeps the last card clear of the floating Report button
  return <div className="px-4 pt-1 pb-28 lg:pb-24">{renderContent()}</div>
}

export default ObservationsListPane
