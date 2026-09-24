import { Spinner } from '@components/ui'
import type { ObservationDateBasis, PublicObservation } from '@domain/types'
import { useTranslations } from 'next-intl'

import ObservationsEmptyState from './ObservationsEmptyState'
import ObservationsList from './ObservationsList'
import type { ObservationsSort } from '../helpers/searchParams'

type ObservationsListPaneProps = {
  dateBasis: ObservationDateBasis
  hasFilters: boolean
  isError: boolean
  isPending: boolean
  observations: PublicObservation[]
  onFiltersClear: VoidFunction
  onOpen: (id: number) => void
  selectedId: number | null
  sort: ObservationsSort
}

const ObservationsListPane = ({
  hasFilters,
  isError,
  isPending,
  observations,
  onFiltersClear,
  ...listProps
}: ObservationsListPaneProps) => {
  const t = useTranslations()

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
      return <ObservationsEmptyState hasFilters={hasFilters} onFiltersClear={onFiltersClear} />
    }

    // eslint-disable-next-line react/jsx-props-no-spreading
    return <ObservationsList {...listProps} observations={observations} />
  }

  // Bottom padding keeps the last card clear of the floating Report button
  return <div className="px-4 pt-1 pb-28 lg:pb-24">{renderContent()}</div>
}

export default ObservationsListPane
