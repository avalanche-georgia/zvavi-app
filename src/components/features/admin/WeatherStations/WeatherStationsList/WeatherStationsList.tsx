'use client'

import { useCallback } from 'react'
import { SortableItem, Spinner } from '@components/ui'
import { DragDropProvider, type DragEndEvent } from '@dnd-kit/react'
import { isSortableOperation } from '@dnd-kit/react/sortable'
import type { WeatherStation } from '@domain/types'
import { useTranslations } from 'next-intl'

import StationRow from './StationRow'

type WeatherStationsListProps = {
  isLoading?: boolean
  onEdit: (station: WeatherStation) => void
  onReorder: (fromIndex: number, toIndex: number) => void
  stations: WeatherStation[]
}

const WeatherStationsList = ({
  isLoading,
  onEdit,
  onReorder,
  stations,
}: WeatherStationsListProps) => {
  const t = useTranslations()

  const handleDragEnd = useCallback<DragEndEvent>(
    (event) => {
      if (event.canceled) return
      if (!isSortableOperation(event.operation)) return
      const { source, target } = event.operation

      if (!source || !target) return
      if (source.initialIndex === target.index) return
      onReorder(source.initialIndex, target.index)
    },
    [onReorder],
  )

  if (isLoading) return <Spinner label={t('common.labels.wait')} size="lg" />

  if (stations.length === 0) {
    return <p className="py-8 text-center text-gray-500">{t('admin.weatherStations.noStations')}</p>
  }

  return (
    <DragDropProvider onDragEnd={handleDragEnd}>
      <div className="overflow-hidden rounded-sm border bg-white shadow-sm">
        <ul>
          {stations.map((station, index) => (
            <SortableItem
              key={station.id}
              className="border-b last:border-0 even:bg-gray-100/60"
              id={station.id}
              index={index}
            >
              {(handleRef) => (
                <StationRow dragHandleRef={handleRef} onEdit={onEdit} station={station} />
              )}
            </SortableItem>
          ))}
        </ul>
      </div>
    </DragDropProvider>
  )
}

export default WeatherStationsList
