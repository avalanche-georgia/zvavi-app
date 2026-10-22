'use client'

import { ListEmptyState } from '@components/features/admin/shared'
import { Loading } from '@components/shared'
import { DragDropProvider, type DragEndEvent } from '@dnd-kit/react'
import { isSortableOperation } from '@dnd-kit/react/sortable'
import type { WeatherStation } from '@domain/types'
import { SortableItem } from '@ds/patterns'
import { useTranslations } from 'next-intl'

import StationRow from './StationRow'

type WeatherStationsListProps = {
  isLoading: boolean
  onEdit: (id: string) => void
  onReorder: (fromIndex: number, toIndex: number) => void
  stations: WeatherStation[]
}

const shellClasses = 'rounded-card border-rule bg-surface overflow-clip border'

// Stations in the order the public page shows them; drag a row to change it
const WeatherStationsList = ({
  isLoading,
  onEdit,
  onReorder,
  stations,
}: WeatherStationsListProps) => {
  const t = useTranslations()

  const handleDragEnd: DragEndEvent = (event) => {
    if (event.canceled || !isSortableOperation(event.operation)) return

    const { source, target } = event.operation

    if (!source || !target || source.initialIndex === target.index) return
    onReorder(source.initialIndex, target.index)
  }

  if (isLoading) {
    return <Loading className={`${shellClasses} h-60 py-0`} />
  }

  if (stations.length === 0) {
    return (
      <div className={shellClasses}>
        <ListEmptyState
          hint={t('admin.weatherStations.empty.hint')}
          title={t('admin.weatherStations.empty.title')}
        />
      </div>
    )
  }

  return (
    <DragDropProvider onDragEnd={handleDragEnd}>
      <ul aria-label={t('admin.weatherStations.title')} className={shellClasses}>
        {stations.map((station, index) => (
          <SortableItem
            key={station.id}
            className="border-rule bg-surface data-dragging:rounded-media data-dragging:shadow-float border-b last:border-b-0"
            id={station.id}
            index={index}
          >
            {(handleRef) => (
              <StationRow dragHandleRef={handleRef} onEdit={onEdit} station={station} />
            )}
          </SortableItem>
        ))}
      </ul>
    </DragDropProvider>
  )
}

export default WeatherStationsList
