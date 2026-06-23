'use client'

import { useBoolean, useToast } from '@components/hooks'
import { ConfirmationDialog } from '@components/shared'
import { IconButton } from '@components/ui'
import { useWeatherStationDelete } from '@data/hooks/weatherStations'
import type { WeatherStation } from '@domain/types'
import { useTranslations } from 'next-intl'

type StationRowProps = {
  dragHandleRef: (element: Element | null) => void
  onEdit: (station: WeatherStation) => void
  station: WeatherStation
}

const StationRow = ({ dragHandleRef, onEdit, station }: StationRowProps) => {
  const t = useTranslations()
  const { mutateAsync: deleteStation } = useWeatherStationDelete()
  const { toastError, toastSuccess } = useToast()
  const [isDeletionDialogOpen, { setFalse: closeDeletionDialog, setTrue: openDeletionDialog }] =
    useBoolean(false)

  const handleDelete = async () => {
    try {
      await deleteStation(station.id)
      closeDeletionDialog()
      toastSuccess(t('admin.weatherStations.form.messages.deleted'))
    } catch (error) {
      toastError('StationRow | handleDelete', { error })
    }
  }

  return (
    <>
      <div className="flex h-14 items-center gap-3 px-4">
        <IconButton
          ref={dragHandleRef}
          aria-label={t('admin.weatherStations.dragToReorder')}
          className="cursor-grab active:cursor-grabbing"
          iconProps={{ icon: 'grip' }}
        />

        <div className="min-w-0 flex-1">
          <div className="font-medium">{station.nameEn}</div>
          {station.nameKa && <div className="truncate text-sm text-gray-400">{station.nameKa}</div>}
        </div>

        <div className="shrink-0 text-sm text-gray-400">{station.altitude}m</div>

        <div className="flex shrink-0 items-center gap-1">
          <IconButton
            aria-label="Open station"
            href={station.url}
            iconProps={{ icon: 'externalLink', size: 'sm' }}
            rel="noopener noreferrer"
            size="sm"
            target="_blank"
          />
          <IconButton
            iconProps={{ icon: 'pencil', size: 'sm' }}
            onClick={() => onEdit(station)}
            size="sm"
          />
          <IconButton
            iconProps={{ icon: 'trash', size: 'sm' }}
            onClick={openDeletionDialog}
            size="sm"
          />
        </div>
      </div>

      <ConfirmationDialog
        description={t('admin.weatherStations.deleteModal.description', { name: station.nameEn })}
        isOpen={isDeletionDialogOpen}
        onClose={closeDeletionDialog}
        onConfirm={handleDelete}
        title={t('admin.weatherStations.deleteModal.title')}
        variant="delete"
      />
    </>
  )
}

export default StationRow
